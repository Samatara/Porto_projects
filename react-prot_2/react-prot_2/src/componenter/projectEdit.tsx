import React, { useState } from 'react';
import type { Project } from './types';

interface ProjectEditFormProps {
  project: Project;
  onUpdate: (updatedProject: Project) => void;
  onCancel: () => void;
}

const ProjectEditForm: React.FC<ProjectEditFormProps> = ({ project, onUpdate, onCancel }) => {
  const [description, setDescription] = useState(project.description);
  const [State, setState] = useState(project.State);
  const [name, setName] = useState(project.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...project, name,description, State });
  };

  return (
    <section id="pro_edit">
    <form onSubmit={handleSubmit}>
    <label>
          Project Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      <label>
        Description:
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        public:
        <input type="checkbox" checked={State} onChange={(e) => setState(e.target.checked)} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
    </section>
  );
};

export default ProjectEditForm;
