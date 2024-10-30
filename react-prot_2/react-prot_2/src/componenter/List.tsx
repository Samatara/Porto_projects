import React, { useState } from 'react';
import type { Project as ProjectProps } from './types';
import ProjectEdit from './projectEdit';

interface ProjectListProps {
  projects: ProjectProps[]; 
  removeprojects: (name: string) => void;
  updateProject?: (name: string, updatedProject: ProjectProps) => Promise<boolean>;
  

}

const ProjectList: React.FC<ProjectListProps> = ({ projects, removeprojects, updateProject }) => {
  const [editingProject, setEditingProject] = useState<ProjectProps | null>(null);

  const handleEdit = (project: ProjectProps) => {
    setEditingProject(project);
  };

  const handleUpdate = async (updatedProject: ProjectProps) => {
    if (updateProject) { 
      const success = await updateProject(updatedProject.name, updatedProject);
      if (success) {
        setEditingProject(null);
      }
    }
  };

  return (
    <div id="pro_list">
      {projects.map((project) => (
        <div key={project.name} className="project-box">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>Status: {project.State ? 'Public' : 'Private'}</p>
          <p>Created on: {new Date(project.created_date).toLocaleDateString()}</p>
          <button onClick={() => removeprojects(project.name)} className="remove-button">Remove Project</button>
          <button onClick={() => handleEdit(project)} className="edit-button">Edit Project</button>
        </div>
      ))}
      
      {editingProject && (
        <ProjectEdit project={editingProject} onUpdate={handleUpdate} onCancel={() => setEditingProject(null)} />
      )}
    </div>
  );
};
export default ProjectList;