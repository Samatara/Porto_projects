import ProjectList from './List';
import NewProjectForm from './new_project';
import useProjects from '../hooks/useProjects';

function Page() {
  
  const { projects, isLoading, isError, handleAddProject, handleRemoveProject } = useProjects();

  return (
    <div className="App">
      <header>Portfolio</header>
      <h1>All Projects</h1>

      {isLoading ? ( 
        <p>Loading projects...</p>
      ) : isError ? ( 
        <p className="error">Failed to load projects</p>
      ) : (
        <ProjectList projects={projects} removeprojects={handleRemoveProject} />
      )}

      <h2>Create a new project</h2>
      <NewProjectForm addProject={handleAddProject} />
    </div>
  );
}

export default Page;
