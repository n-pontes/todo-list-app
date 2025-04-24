import { 
    addProject, 
    addTodo, 
    deleteProject, 
    deleteTodo, 
    editProject,
    editTodo
} from './tasks';

import { 
        selectProject, 
        getTodoForProject, 
        getCurrentProject,
        Todo,
        todoList
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
        const taskDueDate = document.querySelector("#task-due-date").value; // Capture due date
        const taskPriority = document.querySelector("#task-priority").value; // Capture priority

        if (taskTitle) {
            const currentProject = getCurrentProject();
            if (!currentProject) {
                alert("No project selected.");
                return;
            }

            const newTask = new Todo(taskTitle, taskDesc, taskDueDate, taskPriority);
            todoList.push(newTask); // Add task to the global task list

            // Render the new task in the DOM
            const taskElement = createTaskElement(taskTitle, taskDesc, taskDueDate, taskPriority);
            taskListContainer.appendChild(taskElement);

            // Reset form fields
            taskForm.reset();
        }
    });
};
const createTaskElement = (title, description, dueDate, priority) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-card");
    taskElement.innerHTML = `
        <div class="task-info">
            <h3 class="task-title">${title}</h3>
            <p class="task-desc">${description}</p>
            <p class="task-due-date">Due: ${dueDate}</p>
            <p class="task-priority">Priority: ${priority}</p>
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
        const dueDateElement = taskElement.querySelector(".task-due-date");
        const priorityElement = taskElement.querySelector(".task-priority");

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = title;
        titleInput.classList.add("edit-input");

        const descInput = document.createElement("textarea");
        descInput.value = description;
        descInput.classList.add("edit-input");

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.value = dueDate;
        dueDateInput.classList.add("edit-input");

        const priorityInput = document.createElement("select");
        ["Low", "Medium", "High"].forEach(level => {
            const option = document.createElement("option");
            option.value = level;
            option.textContent = level;
            if (level === priority) option.selected = true;
            priorityInput.appendChild(option);
        });
        priorityInput.classList.add("edit-input");

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("save-task-btn");

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-task-btn");

        // Replace elements with inputs
        taskElement.querySelector(".task-info").replaceChildren(
            titleInput,
            descInput,
            dueDateInput,
            priorityInput
        );
        taskElement.querySelector(".edit-task-btn").style.display = "none";
        taskElement.querySelector(".task-actions").appendChild(saveButton);
        taskElement.querySelector(".task-actions").appendChild(cancelButton);

        // Save changes
        saveButton.addEventListener("click", () => {
            const newTitle = titleInput.value.trim();
            const newDesc = descInput.value.trim();
            const newDueDate = dueDateInput.value;
            const newPriority = priorityInput.value;

            if (newTitle && newDesc && newDueDate && newPriority) {
                editTodo(title, "title", newTitle);
                editTodo(newTitle, "description", newDesc);
                editTodo(newTitle, "dueDate", newDueDate);
                editTodo(newTitle, "priority", newPriority);

                titleElement.textContent = newTitle;
                descElement.textContent = newDesc;
                dueDateElement.textContent = `Due: ${newDueDate}`;
                priorityElement.textContent = `Priority: ${newPriority}`;

                taskElement.querySelector(".task-info").replaceChildren(
                    titleElement,
                    descElement,
                    dueDateElement,
                    priorityElement
                );
            }

            saveButton.remove();
            cancelButton.remove();
            taskElement.querySelector(".edit-task-btn").style.display = "inline";
        });

        // Cancel editing
        cancelButton.addEventListener("click", () => {
            taskElement.querySelector(".task-info").replaceChildren(
                titleElement,
                descElement,
                dueDateElement,
                priorityElement
            );
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
    const taskListContainer = document.querySelector(".task-list"); // Task list container
    const headerTitle = document.querySelector("h2"); // The <h2> element with "All Tasks" text
    const currentProject = getCurrentProject(); // Get the currently selected project

    if (!headerTitle) {
        console.error("<h2> element for the task list header not found.");
        return;
    }

    if (!currentProject) {
        // No project selected
        taskListContainer.innerHTML = ""; // Clear the task list
        headerTitle.textContent = "Select a Project"; // Default message
        return;
    }

    // Update the header title to the selected project name
    headerTitle.textContent = currentProject.title;

    const tasks = getTodoForProject(currentProject.id);

    // Clear existing tasks from the DOM
    taskListContainer.innerHTML = "";

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

document.addEventListener("DOMContentLoaded", () => {
    const toggleFormBtn = document.querySelector("#toggle-form-btn");
    const taskFormBox = document.querySelector("#task-form-box");

    // Initially hide the form
    taskFormBox.style.display = "none";

    toggleFormBtn.addEventListener("click", () => {
        if (taskFormBox.style.display === "none") {
            taskFormBox.style.display = "block"; // Show the form
        } else {
            taskFormBox.style.display = "none"; // Hide the form
        }
    });
});