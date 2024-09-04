import test from "node:test";
import { text } from "stream/consumers";

interface Project {
  name: string;
  description: string;
  created_date: string
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
          description: projectDescription,
          created_date: new Date().toISOString()
      };

    
      projectArray.push(new_project);

      try {
          const response = await fetch('http://127.0.0.1:4092/add', {
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
              const created_date = document.createElement("p"); created_date.setAttribute("id","date")
              created_date.textContent= `Created on: ${new Date(new_project.created_date).toLocaleString()}`;
             

              pro_div.appendChild(p_title);
              pro_div.appendChild(p_description);
              pro_div.appendChild(created_date)
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

const loeadingapi = async () => {

  try {
    const response = await fetch('http://127.0.0.1:4092/json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
    });

    console.log(response)
  
    /*
      1. Bearbeide responsen for å få frem lista med prosjekter
      2. Pusje prosjektene til projectArray lista
      3. Oppdatere lista på nettsiden med de nye prosjektene
    */

  } catch (error) {
    console.error(error);
  }
}

loeadingapi()