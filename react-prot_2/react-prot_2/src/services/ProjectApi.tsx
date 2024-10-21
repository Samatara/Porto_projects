import type { Project } from '../componenter/types';
import { endpoints } from "../config/urls";
import { projectsSchema } from "../helpers/validate"

// const API_URL = endpoints.projects;

export const getProjects = async (): Promise<Project[]> => {
    const response = await fetch(endpoints.projects);  
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
  
    
    const parsedProjects = projectsSchema.safeParse(data.projects);
    console.log(projectsSchema.safeParse(data.projects))
  
    if (!parsedProjects.success) {
      console.error('Validation failed:', parsedProjects.error.format());
      throw new Error('Invalid project data');
    }
  
    return parsedProjects.data.map((project: Partial<Project>) => ({
        ...project,
        State: project.State !== undefined ? project.State : false, 
      })) as Project[];
    }; 
  

export const addProject = async (newProject: Partial<Project>): Promise<Project | null> => {
    const response = await fetch(endpoints.addProject, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });
  
    if (!response.ok) {
      console.error('Error adding project:', response.statusText);
      return null;
    }
  
    const data = await response.json();
    console.log("Response from server:", data); 
  
    return data; 
  };
  

export const removeProject = async (name: string): Promise<void> => {
  try {
    await fetch(endpoints.removeProject(name), {
    method: 'DELETE',
  });
  } catch (error){
    console.error(('Failed to remove project'));
    throw error;
  }
};
