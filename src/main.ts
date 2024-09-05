interface Project {
  name: string;
  description: string;
  created_date: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const pro_list = document.getElementById('pro_list') as HTMLDivElement;
  const form = document.getElementById('project-form') as HTMLFormElement;
  let projectArray: Project[] = [];

 
  const loeadingapi = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4093/json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      if (data && Array.isArray(data.projects)) {
        projectArray = data.projects;

      
        pro_list.innerHTML = '';

        
        projectArray.forEach((project: Project, index: number) => {
          const pro_div = document.createElement('div');
          pro_div.id = `project_boxes-${index}`;
          const p_title = document.createElement('h2');
          p_title.textContent = project.name;
          const p_description = document.createElement('p');
          p_description.textContent = project.description;
          const created_date = document.createElement('p');
          created_date.textContent = `Created on: ${new Date(project.created_date).toLocaleString()}`;

          pro_div.appendChild(p_title);
          pro_div.appendChild(p_description);
          pro_div.appendChild(created_date);

          pro_list.appendChild(pro_div);
        });
      } else {
        console.error('Unexpected data format:', data);
      }

    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

 
  loeadingapi();

  form.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const projectName = (document.getElementById('name') as HTMLInputElement).value;
    const projectDescription = (document.getElementById('description') as HTMLInputElement).value;

    const new_project: Project = {
      name: projectName,
      description: projectDescription,
      created_date: new Date().toISOString()
    };

    try {
      const response = await fetch('http://127.0.0.1:4093/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_project)
      });

      if (response.ok) {
        
        projectArray.push(new_project);

        const pro_div = document.createElement('div');
        const p_title = document.createElement('h2');
        p_title.textContent = new_project.name;
        const p_description = document.createElement('p');
        p_description.textContent = new_project.description;
        const created_date = document.createElement('p');
        created_date.textContent = `Created on: ${new Date(new_project.created_date).toLocaleString()}`;

        pro_div.appendChild(p_title);
        pro_div.appendChild(p_description);
        pro_div.appendChild(created_date);

        pro_list.appendChild(pro_div);

        form.reset();
      } else {
        console.error('Error saving the project to the server.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  });
});
