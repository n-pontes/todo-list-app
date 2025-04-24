// DOM interactions

import { addProject } from './tasks.js';

// Handle DOM manipulations
const initializeProjectForm = () => {
  const projectForm = document.querySelector('#project-form');
  const projectListContainer = document.querySelector('.project-list');

  // Handle project form submission
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get project name from input
    const projectInput = document.querySelector('#project-name');
    const projectName = projectInput.value.trim();

    if (projectName) {
      // Add the project using the logic layer
      const newProject = addProject(projectName);

      // Update the DOM
      const projectItem = document.createElement('div');
      projectItem.classList.add('project-item');
      projectItem.textContent = newProject.title;
      projectListContainer.appendChild(projectItem);

      // Clear the input field
      projectInput.value = '';
    }
  });
};

// Initialize the DOM logic
initializeProjectForm();

export { initializeProjectForm };