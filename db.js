const Database = require('better-sqlite3');
const db = new Database('habits.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER NOT NULL,
    logged_at TEXT NOT NULL
  );
`);

const habitCount = db.prepare('SELECT COUNT(*) AS count FROM habits').get().count;

if (habitCount === 0) {
  const insert = db.prepare('INSERT INTO habits (name) VALUES (?)');
  insert.run('Drink water');
  insert.run('Sleep 8 hours');
  insert.run('Exercise for 30 minutes');
}

module.exports = db;
