const express = require('express');
const db = require('./db');
const app = express();
const port = 3001;

app.use(express.static(__dirname));
app.use(express.json());

app.get('/api/habits', function (req, res) {
  const habits = db.prepare('SELECT * FROM habits').all();
  res.json(habits);
});

app.post('/api/log', function (req, res) {
  const habit = db.prepare('SELECT id FROM habits WHERE name = ?').get(req.body.habit);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  db.prepare('INSERT INTO logs (habit_id, logged_at) VALUES (?, ?)').run(habit.id, new Date().toISOString());

  res.json({ status: 'ok' });
});

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
