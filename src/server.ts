import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());


app.use("/static/*", serveStatic({ root: "./" }));


async function loadProjects() {
    const data = await fs.readFile("./src/projson.json", "utf8");
    return JSON.parse(data).projects;
}


async function saveProjects(projects: any) {
    await fs.writeFile("./src/projson.json", JSON.stringify({ projects }, null, 2));
}


app.get("/json", async (c) => {
    console.log("dkddd");
  const projects = await loadProjects();
  return c.json({ projects });
});


app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const projects = await loadProjects(); 

  
  projects.push(newProject);


  await saveProjects(projects);

  return c.json(newProject, 201); 
});

const port = 4092;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
