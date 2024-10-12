import React from 'react';
import type { Project as ProjectProps } from './types';

interface ProjectListProps {
  projects: ProjectProps[]; 
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div id="pro_list">
      {projects.map((project: ProjectProps, index: number) => (
        <div key={index} className="project-box">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>Created on: {new Date(project.created_date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
