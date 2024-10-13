import { useEffect, useState } from 'react';
import ProjectList from './List';
import NewProjectForm from './new_project';

import type {Project as ProjectProps} from './types'


function Page() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  
  const loadProjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4093/json'); 
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };


  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (newProject: ProjectProps) => {
    try {
      const response = await fetch('http://127.0.0.1:4093/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        setProjects([...projects, newProject]);
      } else {
        console.error('Error adding project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="App">
      <header>Portofolio</header>
      <h1>All Projects</h1>
      <ProjectList projects={projects} />
      <h2>Create a new project</h2>
      <NewProjectForm addProject={addProject} />
    </div>
  );
}

export default Page;
