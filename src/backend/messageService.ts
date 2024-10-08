import { getDatabase } from './database';
import { Message } from '../package/types';

export async function getMessages(): Promise<Message[]> {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM messages ORDER BY created_at DESC');
  
  if (result.length === 0) return [];

  return result[0].values.map(row => ({
    id: row[0] as number,
    title: row[1] as string,
    content: row[2] as string,
    read: (row[3] as number) === 1
  }));
}

export async function addMessage(title: string, content: string): Promise<Message> {
  const db = getDatabase();
  db.run('INSERT INTO messages (title, content) VALUES (?, ?)', [title, content]);
  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result[0].values[0][0] as number;

  return { id, title, content, read: false };
}

export async function markMessageAsRead(id: number): Promise<void> {
  const db = getDatabase();
  db.run('UPDATE messages SET read = 1 WHERE id = ?', [id]);
}

export async function deleteMessage(id: number): Promise<void> {
  const db = getDatabase();
  db.run('DELETE FROM messages WHERE id = ?', [id]);
}