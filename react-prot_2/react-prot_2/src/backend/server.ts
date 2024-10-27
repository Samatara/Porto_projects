import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { db } from './db/database'; 
import { createTables } from './db/tabbel';

const app = new Hono();

app.use('/*', cors());

app.use('/static/*', serveStatic({ root: './' }));

createTables();

app.get('/json', async (c) => {
  try {
    let projects = db.prepare('SELECT * FROM projects').all();
    projects = projects.map((project: any) => ({
      ...project,
      State: !!project.State, 
    }));
    return c.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error); 
    return c.json({ error: 'Failed to load projects' }, 500);
  }
});

app.post('/add', async (c) => {
  try {
    const { name, description, State, created_date } = await c.req.json();
    console.log("Received project data:", { name, description, State, created_date });
    const validState =State ? 1 : 0; 
    const validDate = new Date(created_date).toISOString(); 
    console.log("Formatted project data:", { name, description, validState, validDate });
    const stmt = db.prepare(
      'INSERT INTO projects (name, description, State, created_date) VALUES (?, ?, ?, ?)'
    );
    stmt.run(name, description, validState, validDate);

    return c.json({ success: true }, 201);
  } catch (error) {
    console.error('Error adding project:', error);
    return c.json({ error: 'Failed to add project' }, 500);
  }
});

app.delete('/projects/:name', async (c) => {
  const name = c.req.param('name');
  console.log(`Deleting project with name: ${name}`);  
  try {
    
    const stmt = db.prepare('DELETE FROM projects WHERE name = ? COLLATE NOCASE');
    const result = stmt.run(name);

    if (result.changes === 0) {
      console.log(`No project found with name: ${name}`);
      return c.json({ error: 'Project not found' }, 404);
    }

    console.log(`Project deleted with name: ${name}`);
    return c.json({ message: 'Project deleted' }, 200);
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

const port = 4093;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
