import { z } from "zod";


const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  created_date: z.string().datetime(),  
});

const projectsSchema = z.array(projectSchema);

export { projectSchema, projectsSchema };
