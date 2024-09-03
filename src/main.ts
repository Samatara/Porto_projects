interface Project {
  name: string;
  description: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const pro_list = document.getElementById('pro_list') as HTMLDivElement;
  const form = document.getElementById('project-form') as HTMLFormElement;
  let projectArray: Project[] = [];


  fetch('projson.json')
      .then(response => response.json())
      .then(jsdata => {
          jsdata.projects.forEach((project: Project) => {
              const pro_div = document.createElement('div');
              const p_title = document.createElement('h2');
              p_title.textContent = project.name;
              const p_description = document.createElement('p');
              p_description.textContent = project.description;

              pro_div.appendChild(p_title);
              pro_div.appendChild(p_description);
              pro_list.appendChild(pro_div);
          });
      });

  form.addEventListener('submit', async (event: Event) => {
      event.preventDefault();

      const projectName = (document.getElementById('name') as HTMLInputElement).value;
      const projectDescription = (document.getElementById('description') as HTMLInputElement).value;

      const new_project: Project = {
          name: projectName,
          description: projectDescription
      };

    
      projectArray.push(new_project);

      try {
          const response = await fetch('projson.json', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(new_project)
          });

          if (response.ok) {
              const pro_div = document.createElement('div');
              const p_title = document.createElement('h2');
              p_title.textContent = new_project.name;
              const p_description = document.createElement('p');
              p_description.textContent = new_project.description;

              pro_div.appendChild(p_title);
              pro_div.appendChild(p_description);
              pro_list.appendChild(pro_div);

              form.reset();
          } else {
              console.error("Error saving the project to the server.");
          }
      } catch (error) {
          console.error("Error during fetch:", error);
      }
  });
});
