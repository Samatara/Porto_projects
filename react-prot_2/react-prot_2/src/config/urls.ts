const baseUrl = "http://127.0.0.1:4093";

const endpointsProjects = {
  projects: `${baseUrl}/json`,        
  addProject: `${baseUrl}/add`,       
  removeProject: (name: string) => `${baseUrl}/projects/${name}`, 
};

export { baseUrl, endpointsProjects as endpoints };
