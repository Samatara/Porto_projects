
import { db } from './database';

export const createTables = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      name TEXT NOT NULL,
      description TEXT,
      State INTEGER NOT NULL DEFAULT 0,
      created_date TEXT NOT NULL
    );
    
  `);
  
};

createTables();
