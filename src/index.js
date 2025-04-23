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

// Helper function so that the ID is not necessary upon selecting a project
const selectProject = (projectTitle) => {
    const project = projectList.find(p => p.title === projectTitle);
    if (!project) {
        console.log("Project not found");
        return;
    }
    currentProject = project;
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

    console.log(`Todo was added to "${currentProject.title}"`, newTodo);
};

// List all todos for a project
const getTodoForProject = (projectId) => {
    return todoList.filter (todo => todo.projectId === projectId);
};

// Remove a project from the list
const deleteProject = (title) => {
    const index = projectList.findIndex(p => p.title === title);
    
    if (index !== -1) {
        const removedProject = projectList.splice(index, 1)[0]; // Remove the project and store it
        console.log(`Project "${removedProject.title}" was successfully removed.`);
        
        // Remove associated tasks from todoList
        const originalTaskCount = todoList.length;
        todoList = todoList.filter(todo => todo.projectId !== removedProject.id);
        console.log(`Removed ${originalTaskCount - todoList.length} associated tasks.`);
        
        return true;
    } else {
        console.log('Project not found!');
        return false;
    }
};

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
addProject('Make Lunch');
addProject('Rest');
selectProject("New Project");
addTodo('Gym', 'Going to the fitnesstudio', '2011-10-10', 'High', 'Take water', 'not done');

selectProject("Make Lunch");
addTodo('Pork', 'Pork roasted in the oven', '2025-11-18', 'Medium', 'Dont forget butter', 'not done');

console.table(projectList);
console.table(todoList);

deleteProject('New Project');

console.table(projectList);
console.table(todoList);