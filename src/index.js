// Entry point - It will initialize the app, wire everything together, and set up the initial state

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

    // console.log(`Todo was added to "${currentProject.title}"`, newTodo);
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

// Remove a todo from a project
const deleteTodo = (todoTitle) => {
    if (!currentProject) {
        console.log('Project not selected');
        return;
    } 

    const todoIndex = todoList.findIndex(
        t => t.title === todoTitle && t.projectId === currentProject.id
    );

    if (todoIndex === -1) {
        console.log('The todo does not exist in the selected project');
        return;
    }

    // Remove the task from todoList
    const removedTodo = todoList.splice(todoIndex, 1)[0];
    console.log(`Todo "${removedTodo.title}" was successfully deleted.`);
};

// Edit array objects by title and field
let editProject = (projectTitle, newTitle) => {

    // Find the project by its title
    let project = projectList.find(p => p.title === projectTitle);

    if (!project) {
        console.log('Project was not found');
        return;
    } 

    //Update the project Title
    project.title = newTitle;
};

// Edit todo from a project

let editTodo = (todoTitle, field, newValue) => {
    if (!currentProject) {
        console.log('No Project selected');
        return;
    }

    // Find the todo within the current project
    const todo = todoList.find(t => t.title === todoTitle && t.projectId === currentProject.id);

    if (!todo) {
        console.log('Todo not found in the selected project');
        return;
    }

    // Check if the field exists on the todo object
    if (!todo.hasOwnProperty(field)) {
        console.log(`Field "${field}" does not exist on the todo.`);
        return;
    }

    // Update the field with the new value
    todo[field] = newValue;
};

addProject('Make Lunch'); // Adds a project with a title name
selectProject("Make Lunch"); // Selects the project

// Todo examples
addTodo('Pork', 'Pork roasted in the oven', '2025-11-18', 'Medium', 'Dont forget butter', 'not done');
addTodo('Chicken', 'Fried Chicken', '2022-1-22', 'Low', 'Rosemary is important', 'done');
addTodo('Beef', 'Wagiu deep boiled', '2020-16-18', 'High', 'Too much fat be careful', 'not done');

console.table(projectList);
console.table(todoList);

deleteTodo('Pork'); // Deletes a todo from specific project
console.table(todoList);

editProject('Make Lunch', 'Make Dinner'); // Edits the project title
console.table(projectList);

editTodo('Beef', 'priority', 'Low'); // Edits a todo from a specific project
console.table(todoList);