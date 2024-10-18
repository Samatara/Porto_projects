
import { useCallback, useEffect, useState } from 'react';
import ProjectList from '../componenter/List';
import NewProjectForm from '../componenter/new_project';
import { getProjects, addProject, removeProject } from '../services/ProjectApi';

import type {Project as ProjectProps} from '../componenter/types'

export function useProjects(){


  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading]= useState<boolean> (true);
  const [error, setError] = useState<string | null>(null);


 const isLoading = !!loading;
 const isError = !!error;

  const loadProjects = useCallback(async () => {
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
  },[]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleAddProject = async (newProject: ProjectProps) => {
    try {
      setLoading(true);
      await addProject(newProject);
      await loadProjects(); 
    } catch (error) {
      setError('Failed to add project');
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveProject = async (name: string) => {
    if (!name) return;
    try {
        await removeProject(name);
        await loadProjects();
        setLoading(true);
    } catch (error) {
      setError('Failed to remove project');
    } finally{
        setLoading(false)
    }
  };

  return {
    projects,
    isLoading,  
    isError,    
    handleAddProject,
    handleRemoveProject,
  };
}
export default useProjects;