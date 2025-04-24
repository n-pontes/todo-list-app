// DOM interactions

import { addProject } from './tasks';

document.querySelector('#project-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const projectInput = document.querySelector('#project-name');
    const projectName = projectInput.value.trim();

    if (projectName) {
        addProject(projectName);

        // Update the DOM
        const projectListContainer = document.querySelector('.project-list');
        const newProjectElement = document.createElement('div');
        newProjectElement.classList.add('project-item');
        newProjectElement.textContent = projectName;
        projectListContainer.appendChild(newProjectElement);

        // Clear the input field
        projectInput.value = '';
    }
});