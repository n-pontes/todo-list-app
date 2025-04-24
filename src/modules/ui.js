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
    const projectForm = document.querySelector("#project-form");
    const projectListContainer = document.querySelector(".project-list");

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const projectInput = document.querySelector("#project-name");
        const projectName = projectInput.value.trim();

        if (projectName) {
            addProject(projectName);

            // Add to DOM
            const newProjectElement = createProjectElement(projectName);
            projectListContainer.appendChild(newProjectElement);
            projectInput.value = ""; // Clear input field
        }
    });
};

// Create Project Element (with inline editing)
const createProjectElement = (projectName) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project-item");
    projectElement.dataset.projectTitle = projectName;
    projectElement.innerHTML = `
        <span class="project-title">${projectName}</span>
        <button class="edit-project-btn">Edit</button>
    `;

    // Add event listener for inline editing
    projectElement.querySelector(".edit-project-btn").addEventListener("click", () => {
        const titleSpan = projectElement.querySelector(".project-title");
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = projectName;
        editInput.classList.add("edit-input");

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("save-project-btn");

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-project-btn");

        // Replace title span with input field
        projectElement.replaceChild(editInput, titleSpan);
        projectElement.querySelector(".edit-project-btn").style.display = "none";
        projectElement.appendChild(saveButton);
        projectElement.appendChild(cancelButton);

        // Save changes
        saveButton.addEventListener("click", () => {
            const newTitle = editInput.value.trim();
            if (newTitle && newTitle !== projectName) {
                editProject(projectName, newTitle);
                projectElement.dataset.projectTitle = newTitle;
                editInput.replaceWith(titleSpan);
                titleSpan.textContent = newTitle;
            } else {
                editInput.replaceWith(titleSpan);
            }
            saveButton.remove();
            cancelButton.remove();
            projectElement.querySelector(".edit-project-btn").style.display = "inline";
        });

        // Cancel editing
        cancelButton.addEventListener("click", () => {
            editInput.replaceWith(titleSpan);
            saveButton.remove();
            cancelButton.remove();
            projectElement.querySelector(".edit-project-btn").style.display = "inline";
        });
    });

    // Handle project selection
    projectElement.addEventListener("click", () => {
        selectProject(projectName);
        updateTaskList();
    });

    return projectElement;
};

// Initialize Task Form
const initializeTaskForm = () => {
    const taskForm = document.querySelector("#task-form");
    const taskListContainer = document.querySelector(".task-list");

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskTitle = document.querySelector("#task-title").value.trim();
        const taskDesc = document.querySelector("#task-desc").value.trim();

        if (taskTitle) {
            const currentProject = getCurrentProject();
            if (!currentProject) {
                taskListContainer.innerHTML =
                    "<p class='error'>No project selected! Please select a project to add tasks.</p>";
                return;
            }

            addTodo(taskTitle, taskDesc);

            // Add to DOM
            const newTaskElement = createTaskElement(taskTitle, taskDesc);
            taskListContainer.appendChild(newTaskElement);
        }
    });
};

// Create Task Element (with inline editing)
const createTaskElement = (title, description) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-card");
    taskElement.innerHTML = `
        <div class="task-info">
            <h3 class="task-title">${title}</h3>
            <p class="task-desc">${description}</p>
        </div>
        <div class="task-actions">
            <button class="edit-task-btn">Edit</button>
            <button class="delete-task-btn">Delete</button>
        </div>
    `;

    // Edit Task Inline
    taskElement.querySelector(".edit-task-btn").addEventListener("click", () => {
        const titleElement = taskElement.querySelector(".task-title");
        const descElement = taskElement.querySelector(".task-desc");

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = title;
        titleInput.classList.add("edit-input");

        const descInput = document.createElement("textarea");
        descInput.value = description;
        descInput.classList.add("edit-input");

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("save-task-btn");

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-task-btn");

        // Replace title and description with inputs
        taskElement.querySelector(".task-info").replaceChildren(titleInput, descInput);
        taskElement.querySelector(".edit-task-btn").style.display = "none";
        taskElement.querySelector(".task-actions").appendChild(saveButton);
        taskElement.querySelector(".task-actions").appendChild(cancelButton);

        // Save changes
        saveButton.addEventListener("click", () => {
            const newTitle = titleInput.value.trim();
            const newDesc = descInput.value.trim();

            if (newTitle && newDesc) {
                editTodo(title, "title", newTitle);
                editTodo(newTitle, "description", newDesc);

                titleElement.textContent = newTitle;
                descElement.textContent = newDesc;

                taskElement.querySelector(".task-info").replaceChildren(titleElement, descElement);
            }

            saveButton.remove();
            cancelButton.remove();
            taskElement.querySelector(".edit-task-btn").style.display = "inline";
        });

        // Cancel editing
        cancelButton.addEventListener("click", () => {
            taskElement.querySelector(".task-info").replaceChildren(titleElement, descElement);
            saveButton.remove();
            cancelButton.remove();
            taskElement.querySelector(".edit-task-btn").style.display = "inline";
        });
    });

    // Delete Task
    taskElement.querySelector(".delete-task-btn").addEventListener("click", () => {
        deleteTodo(title);
        taskElement.remove();
    });

    return taskElement;
};

// Update Task List
const updateTaskList = () => {
    const taskListContainer = document.querySelector(".task-list");
    const currentProject = getCurrentProject();

    if (!currentProject) {
        taskListContainer.innerHTML =
            "<p>No project selected. Select a project to view tasks.</p>";
        return;
    }

    const tasks = getTodoForProject(currentProject.id);

    // Clear existing tasks from the DOM
    taskListContainer.innerHTML = "";

    if (tasks.length === 0) {
        taskListContainer.innerHTML = "";
        return;
    }

    // Add tasks to the DOM
    tasks.forEach((task) => {
        const taskElement = createTaskElement(task.title, task.description);
        taskListContainer.appendChild(taskElement);
    });
};

// Initialize All
document.addEventListener("DOMContentLoaded", () => {
    initializeProjectForm();
    initializeTaskForm();
});