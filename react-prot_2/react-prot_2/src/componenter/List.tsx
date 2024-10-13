import React from 'react';
import type { Project as ProjectProps } from './types';

interface ProjectListProps {
  projects: ProjectProps[]; 
  removeprojects: (name: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, removeprojects}) => {
  return (
    <div id="pro_list">
      {projects.map((project: ProjectProps, index: number) => (
        <div key={index} className="project-box">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>Created on: {new Date(project.created_date).toLocaleDateString()}</p>
          <button onClick={()=> removeprojects(project.name)} className="remove-button">Remove project</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
