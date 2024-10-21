import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFile, writeFile } from 'node:fs/promises';

const app = new Hono();

app.use('/*', cors());

app.use('/static/*', serveStatic({ root: './' }));

async function loadProjects() {
  const data = await readFile('./src/backend/projson.json', 'utf8');
  return JSON.parse(data).projects;
}

async function saveProjects(projects: any) {
  await writeFile('./src/backend/projson.json', JSON.stringify({ projects }, null, 2));
}

app.get('/json', async (c) => {
  const projects = await loadProjects();
  return c.json({ projects });
});

app.post('/add', async (c) => {
  const newProject = await c.req.json();
  const projects = await loadProjects();
  projects.push(newProject);
  await saveProjects(projects);
  return c.json(newProject, 201);
});

app.delete('/projects/:name', async (c) => {
  const name = c.req.param('name');
  let projects = await loadProjects();
  const projectIndex = projects.findIndex((project: { name: string; }) => project.name === name);

  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    await saveProjects(projects);
    return c.json({ message: 'Project deleted' }, 200);
  } else {
    return c.json({ error: 'Project not found' }, 404);
  }
});

const port = 4093;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
