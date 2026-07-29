require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./db'); // note: habits.db is ephemeral on Render's free tier — wiped on every redeploy
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.post('/api/signup', function (req, res) {
  const username = (req.body.username || '').trim().toLowerCase();
  const password = req.body.password || '';

  if (!username) {
    return res.status(400).json({ error: 'Username cannot be empty' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash);
    req.session.userId = result.lastInsertRowid;
    res.json({ id: result.lastInsertRowid, username: username });
  } catch (err) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

app.post('/api/login', function (req, res) {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username.trim().toLowerCase());

  if (!user || !bcrypt.compareSync(req.body.password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  req.session.userId = user.id;
  res.json({ id: user.id, username: user.username });
});

app.get('/api/me', function (req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const user = db.prepare('SELECT id, username, role FROM users WHERE id = ?').get(req.session.userId);
  res.json(user);
});

app.post('/api/logout', function (req, res) {
  req.session.destroy(function () {
    res.json({ status: 'ok' });
  });
});

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  next();
}

function requireAdmin(req, res, next) {
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.session.userId);

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
}

app.get('/api/admin/stats', requireAuth, requireAdmin, function (req, res) {
  const stats = db.prepare(`
    SELECT users.username,
      COUNT(DISTINCT habits.id) AS habit_count,
      COUNT(logs.id) AS total_logs
    FROM users
    LEFT JOIN habits ON habits.user_id = users.id
    LEFT JOIN logs ON logs.habit_id = habits.id
    GROUP BY users.id
  `).all();

  res.json(stats);
});

app.get('/api/habits', requireAuth, function (req, res) {
  const habits = db.prepare(`
    SELECT habits.*,
      EXISTS (
        SELECT 1 FROM logs
        WHERE logs.habit_id = habits.id
        AND date(logs.logged_at) = date('now')
      ) AS done_today
    FROM habits
    WHERE habits.user_id = ?
  `).all(req.session.userId);

  res.json(habits);
});

app.get('/api/habits/:id/history', requireAuth, function (req, res) {
  const habit = db.prepare('SELECT id FROM habits WHERE id = ? AND user_id = ?').get(req.params.id, req.session.userId);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  const logs = db.prepare(`
    SELECT date(logged_at) AS log_date
    FROM logs
    WHERE habit_id = ?
    AND logged_at >= date('now', '-6 days')
    ORDER BY log_date
  `).all(habit.id);

  res.json(logs);
});

app.post('/api/habits', requireAuth, function (req, res) {
  const name = (req.body.name || '').trim();

  if (!name) {
    return res.status(400).json({ error: 'Habit name cannot be empty' });
  }

  const result = db.prepare('INSERT INTO habits (user_id, name) VALUES (?, ?)').run(req.session.userId, name);
  res.json({ id: result.lastInsertRowid, name: name });
});

app.post('/api/log', requireAuth, function (req, res) {
  const habit = db.prepare('SELECT id FROM habits WHERE name = ? AND user_id = ?').get(req.body.habit, req.session.userId);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  const existing = db.prepare(`
    SELECT id FROM logs
    WHERE habit_id = ? AND date(logged_at) = date('now')
  `).get(habit.id);

  if (existing) {
    db.prepare('DELETE FROM logs WHERE id = ?').run(existing.id);
  } else {
    db.prepare('INSERT INTO logs (habit_id, logged_at) VALUES (?, ?)').run(habit.id, new Date().toISOString());
  }


  res.json({ status: 'ok' });
});

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
