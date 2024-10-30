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
  console.log("Server response data:", data);

  
  const parsedProjects = projectsSchema.safeParse(data);

  if (!parsedProjects.success) {
    console.error('Validation failed:', parsedProjects.error.format());
    throw new Error('Invalid project data');
  }

  
  return parsedProjects.data.projects.map((project: Partial<Project>) => ({
    ...project,
    State: project.State !== undefined ? project.State : false, 
  })) as Project[];
    }; 
  

    export const addProject = async (newProject: Partial<Project>): Promise<Project | null> => {
      console.log("Sending project data to server:", newProject);
      try {
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
      } catch (error) {
        console.error("Error in addProject fetch request:", error);
        return null;
      }
    };

    export const updateProject = async (name: string, updatedProject: Partial<Project>): Promise<Project | null> => {
      console.log("Updating project on server:", updatedProject);
      try {
        const response = await fetch(endpoints.updateProject(name), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProject),
        });
    
        if (!response.ok) {
          console.error('Error updating project:', response.statusText);
          return null;
        }
    
        const data = await response.json();
        console.log("Update response from server:", data);
        return data;
      } catch (error) {
        console.error("Error in updateProject fetch request:", error);
        return null;
      }
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


