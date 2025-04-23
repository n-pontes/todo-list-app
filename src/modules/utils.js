// Focus on utility-helpers functions

// Stores all the projects 
let projectList = [];

// Store the current selected project in a variable
let currentProject = null;

// Stores all tasks
let todoList = [];

// Project constructor
class Project {
    constructor (title) {
        this.id = crypto.randomUUID(); // Generates an unique ID
        this.title = title;
    }
};
// Tasks constructor
class Todo {
    constructor (title, description, dueDate, priority, notes, isDone) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.notes = notes;
        this.isDone = isDone ?? false;
        this.projectId = currentProject.id; // Links to the project
    }
};

// Helper function so that the ID is not necessary upon selecting a project
const selectProject = (projectTitle) => {
    const project = projectList.find(p => p.title === projectTitle);
    if (!project) {
        console.log("Project not found");
        return;
    }
    currentProject = project;
};

// List all todos for a project
const getTodoForProject = (projectId) => {
    return todoList.filter (todo => todo.projectId === projectId);
};

// Explicitly returns the currently selected project
const getCurrentProject = () => {
    if (!currentProject) {
        console.log("No project selected.");
        return null;
    }
    return currentProject;
};

export { selectProject, getTodoForProject, getCurrentProject, projectList, currentProject, todoList, Project, Todo };
