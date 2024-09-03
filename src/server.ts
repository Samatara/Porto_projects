// import { Hono } from 'hono';
// import { serve } from '@hono/node-server';
// import fs from 'fs';

// const app = new Hono();

// let projects = JSON.parse(fs.readFileSync('./public/projjson.json', 'utf8')).projects;


// app.get('/json', (c) => {
//   return c.json({ projects });
// });


// app.post('/json', async (c) => {
//   const newProject = await c.req.json();
//   projects.push(newProject);

  
//   fs.writeFileSync('./public/projjson.json', JSON.stringify({ projects }, null, 2));

//   return c.json(newProject);
// });

// serve(app, { port: 3999 });
