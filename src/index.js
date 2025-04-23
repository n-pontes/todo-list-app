// Stores all the projects 
const projectList = [];

// Store the current selected project in a variable
let currentProject = null;

// Stores all tasks
const todoList = [];

// Project constructor
class Project {
    constructor (title) {
        this.id = crypto.randomUUID(); // Generates an unique ID
        this.title = title;
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
}

// Tasks constructor
class Todo {
    constructor (title, description, dueDate, priority, notes, isDone) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date (dueDate);
        this.priority = priority;
        this.notes = notes;
        this.isDone = isDone = false;
    }
};

// Add a new Project
const addProject = (title) => {
    const newProject = new Project(title);
    projectList.push(newProject);
}

// Add a new task to a project
const addTodo = (title, description, dueDate, priority, notes, isDone) => {
    if (!currentProject) {
        console.log("No project selected.");
        return;
    }
    
    const newTodo = new Todo(title, description, dueDate, priority, notes, isDone);
    todoList.push(newTodo);
    currentProject.todoList.push(newTodo);
    console.log(`Todo was added to "${currentProject.title}"`, newTodo);
};

// // Add new task
// const addNewTask = (title, description, dueDate, priority, notes, checkList) => {
//     const newTask = new Task(title, description, dueDate, priority, notes, checkList);
//     myProjects.push(newTask);
// };

// // Remove item from array
// let deleteTask = (title) => {
//     let index = myProjects.findIndex(task => task.title === title);
//     if (index !== -1) {
//         myProjects.splice(index, 1); // Removes the task at the found index
//         console.log(`Task with title "${title}" has been deleted.`);
//     } else {
//         console.log('Task not found!');
//     }
// };

// // Edit array objects by title and field
// let editTask = (title, field, newValue) => {
//     // Find the task by its title
//     let task = myProjects.find(task => task.title === title);

//     if (!task) {
//         console.log('Item was not found!');
//     } else {
//         // Check if the field exists on the task object
//         if (task.hasOwnProperty(field)) {
//             task[field] = newValue; // Update the field with the new value
//         } else {
//             console.log(`Field "${field}" does not exist on the task.`);
//         }
//     }
// };

// // Example usage
// addNewTask('Testing 123', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');

// editTask('Testing 123', 'description', 'Updated description here');
// editTask('Testing 123', 'priority', 'Low');

// console.table(myProjects); // Check updated tasks

addProject('New Project');
console.table(projectList);

selectProject("New Project");
addTodo('Gym', 'Going to the fitnesstudio', 'Tomorrow', 'High', 'Take water', 'not done');
console.table(todoList);