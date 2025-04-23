// This module will handle core CRUD logic for both projects and todos

import { projectList, currentProject, todoList, Project, Todo } from "./models";

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

export { addProject, addTodo, deleteProject, deleteTodo, editProject, editTodo };