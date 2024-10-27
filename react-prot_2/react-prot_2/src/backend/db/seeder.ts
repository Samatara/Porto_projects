import { db } from './database';

export const seedProjects = () => {
  const stmt = db.prepare(`
    INSERT INTO projects (name, description, State, created_date)
    VALUES (?, ?, ?, ?)
  `);

  
};

seedProjects();