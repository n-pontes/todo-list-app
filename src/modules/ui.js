import { 
    addProject, 
    addTodo, 
    deleteProject, 
    deleteTodo, 
    editProject
} from './tasks';

import { 
        selectProject, 
        getTodoForProject, 
        getCurrentProject
} from './utils'

// Initialize Project Form
const initializeProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    const projectListContainer = document.querySelector('.project-list');

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectInput = document.querySelector('#project-name');
        const projectName = projectInput.value.trim();

        if (projectName) {
            addProject(projectName);

            // Add to DOM
            const newProjectElement = document.createElement('div');
            newProjectElement.classList.add('project-item');
            newProjectElement.dataset.projectTitle = projectName;
            newProjectElement.innerHTML = `
                <span>${projectName}</span>
                <button class="edit-project-btn">Edit</button>
            `;
            newProjectElement.addEventListener('click', () => {
                selectProject(projectName);
                updateTaskList();
            });

            projectListContainer.appendChild(newProjectElement);
            projectInput.value = ''; // Clear input field
        }
    });
};

// Initialize Task Form
const initializeTaskForm = () => {
    const taskForm = document.querySelector('#task-form');
    const taskListContainer = document.querySelector('.task-list');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskTitle = document.querySelector('#task-title').value.trim();
        const taskDesc = document.querySelector('#task-desc').value.trim();

        if (taskTitle) {
            const currentProject = getCurrentProject();
            if (!currentProject) {
                alert('No project selected!');
                return;
            }

            addTodo(taskTitle, taskDesc);

            // Add to DOM
            const newTaskElement = document.createElement('div');
            newTaskElement.classList.add('task-card');
            newTaskElement.innerHTML = `
                <div class="task-info">
                    <h3>${taskTitle}</h3>
                    <p>${taskDesc}</p>
                </div>
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            taskListContainer.appendChild(newTaskElement);
        }
    });
};

// Initialize Editing Projects
const initializeProjectEditing = () => {
    const projectListContainer = document.querySelector('.project-list');

    projectListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-project-btn')) {
            const projectElement = event.target.parentElement;
            const currentTitle = projectElement.dataset.projectTitle;

            // Prompt user for new project title
            const newTitle = prompt(`Edit project name (current: ${currentTitle}):`, currentTitle);

            if (newTitle && newTitle.trim() !== '' && newTitle !== currentTitle) {
                editProject(currentTitle, newTitle);

                // Update the DOM
                projectElement.dataset.projectTitle = newTitle;
                projectElement.querySelector('span').textContent = newTitle;

                alert(`Project updated to "${newTitle}"!`);
            }
        }
    });
};

// Update Task List
const updateTaskList = () => {
    const taskListContainer = document.querySelector('.task-list');
    const currentProject = getCurrentProject();

    if (!currentProject) {
        taskListContainer.innerHTML = '<p>No project selected. Select a project to view tasks.</p>';
        return;
    }

    const tasks = getTodoForProject(currentProject.id);

    // Clear existing tasks from the DOM
    taskListContainer.innerHTML = '';

    if (tasks.length === 0) {
        taskListContainer.innerHTML = '<p>No tasks for this project.</p>';
        return;
    }

    // Add tasks to the DOM
    tasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-card');
        taskElement.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskListContainer.appendChild(taskElement);
    });
};

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectForm();
    initializeTaskForm();
    initializeProjectEditing();
});

