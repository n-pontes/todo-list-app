// Entry point - It will initialize the app, wire everything together, and set up the initial state

import './styles.css';
import { selectProject, getTodoForProject, getCurrentProject } from "./modules/utils";
import { projectList, currentProject, todoList } from "./modules/utils";
import { addProject, addTodo, deleteProject, deleteTodo, editProject, editTodo } from "./modules/tasks";

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
console.table(projectList);