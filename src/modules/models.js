// Stores all the projects 
export let projectList = [];

// Store the current selected project in a variable
export let currentProject = null;

// Stores all tasks
export let todoList = [];

// Project constructor
export class Project {
    constructor (title) {
        this.id = crypto.randomUUID(); // Generates an unique ID
        this.title = title;
    }
};
// Tasks constructor
export class Todo {
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