const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./db');
const app = express();
const port = 3001;

app.use(express.static(__dirname));
app.use(express.json());
app.use(session({
  secret: 'replace-this-later',
  resave: false,
  saveUninitialized: false
}));

app.post('/api/signup', function (req, res) {
  const passwordHash = bcrypt.hashSync(req.body.password, 10);

  try {
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(req.body.username, passwordHash);
    req.session.userId = result.lastInsertRowid;
    res.json({ id: result.lastInsertRowid, username: req.body.username });
  } catch (err) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

app.post('/api/login', function (req, res) {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username);

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

  res.json({ id: req.session.userId });
});

app.get('/api/habits', function (req, res) {
  const habits = db.prepare(`
    SELECT habits.*,
      EXISTS (
        SELECT 1 FROM logs
        WHERE logs.habit_id = habits.id
        AND date(logs.logged_at) = date('now')
      ) AS done_today
    FROM habits
  `).all();

  res.json(habits);
});

app.get('/api/habits/:id/history', function (req, res) {
  const logs = db.prepare(`
    SELECT date(logged_at) AS log_date
    FROM logs
    WHERE habit_id = ?
    AND logged_at >= date('now', '-6 days')
    ORDER BY log_date
  `).all(req.params.id);

  res.json(logs);
});

app.post('/api/habits', function (req, res) {
  const result = db.prepare('INSERT INTO habits (name) VALUES (?)').run(req.body.name);
  res.json({ id: result.lastInsertRowid, name: req.body.name });
});

app.post('/api/log', function (req, res) {
  const habit = db.prepare('SELECT id FROM habits WHERE name = ?').get(req.body.habit);

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
