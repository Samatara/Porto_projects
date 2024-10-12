import React, { useState } from 'react';
import type { Project} from './types';



interface NewProjectFormProps {
  addProject: (project: Project) => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ addProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      name,
      description,
      created_date: new Date().toISOString(),
    };

    addProject(newProject);

    setName(''); 
    setDescription('');
  };

  return (
    <form id="project-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">Create Project</button>
    </form>
  );
};

export default NewProjectForm;
