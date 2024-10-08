import initSqlJs, { Database } from 'sql.js';

let db: Database | null = null;

export async function initDatabase() {
  if (db) return;

  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  db = new SQL.Database();
  
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}