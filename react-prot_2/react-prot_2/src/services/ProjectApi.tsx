import type { Project } from '../componenter/types';

const API_URL = 'http://127.0.0.1:4093';

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/json`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await response.json();
  return data.projects;
};

export const addProject = async (newProject: Partial<Project>): Promise<Project | null> => {
    const response = await fetch(`${API_URL}/add`, {
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
  const response = await fetch(`http://127.0.0.1:4093/projects/${name}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove project');
  }
};
