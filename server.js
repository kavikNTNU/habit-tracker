const express = require('express');
const db = require('./db');
const app = express();
const port = 3001;

app.use(express.static(__dirname));
app.use(express.json());

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
