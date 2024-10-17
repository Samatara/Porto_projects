import { useEffect, useState } from 'react';
import ProjectList from './List';
import NewProjectForm from './new_project';
import { getProjects, addProject, removeProject } from '../services/ProjectApi';
import type {Project as ProjectProps} from './types'


function Page() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading]= useState<boolean> (true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async (newProject: ProjectProps) => {
    const addedProject = await addProject(newProject);
    if (addedProject) {
      setProjects((prevProjects) => [...prevProjects, addedProject]);
    } else {
      
      setError('Failed to add project');
    }
  };
  const handleRemoveProject = async (name: string) => {
    try {
      await removeProject(name); 
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.name !== name)
      );
    } catch (error) {
      setError('Failed to remove project');
    }
  };

  return (
    <div className="App">
      <header>Portfolio</header>
      <h1>All Projects</h1>

      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ProjectList projects={projects} removeprojects={handleRemoveProject} />
      )}

      <h2>Create a new project</h2>
      <NewProjectForm addProject={handleAddProject} />
    </div>
  );
}

export default Page;
