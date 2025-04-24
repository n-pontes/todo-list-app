// Entry point - It will initialize the app, wire everything together, and set up the initial state

import './styles.css';
import { selectProject, getTodoForProject, getCurrentProject, projectList, currentProject, todoList } from "./modules/utils";
import { addProject, addTodo, deleteProject, deleteTodo, editProject, editTodo } from "./modules/tasks.js";
import { initializeProjectForm } from './modules/ui';
import { createProjectElement } from './modules/ui.js'; // Import the function that creates and appends the project element

// Test if the project and tasks work properly
document.addEventListener("DOMContentLoaded", () => {
    // List of projects and their respective tasks
    const projectsWithTasks = [
        {
            projectName: "Work",
            tasks: [
                { title: "Finish Report", description: "Complete the quarterly report", dueDate: "2025-04-30", priority: "High" },
                { title: "Team Meeting", description: "Discuss the project milestones", dueDate: "2025-04-28", priority: "Medium" },
                { title: "Client Feedback", description: "Review feedback from the client", dueDate: "2025-04-29", priority: "Low" }
            ]
        },
        {
            projectName: "Personal",
            tasks: [
                { title: "Buy Groceries", description: "Get essentials for the week", dueDate: "2025-04-25", priority: "Low" },
                { title: "Call Mom", description: "Catch up with mom over the phone", dueDate: "2025-04-26", priority: "High" },
                { title: "Plan Birthday", description: "Plan a surprise birthday party", dueDate: "2025-04-27", priority: "Medium" }
            ]
        },
        {
            projectName: "Fitness",
            tasks: [
                { title: "Morning Run", description: "Go for a 5km morning run", dueDate: "2025-04-27", priority: "Medium" },
                { title: "Yoga Session", description: "Attend the weekly yoga session", dueDate: "2025-04-28", priority: "Low" },
                { title: "Gym Workout", description: "Complete a 1-hour strength training", dueDate: "2025-04-29", priority: "High" }
            ]
        }
    ];

    // Add each project and its tasks
    const projectListContainer = document.querySelector(".project-list");
    projectsWithTasks.forEach(({ projectName, tasks }) => {
        // Add the project
        addProject(projectName);

        // Update the UI
        const projectElement = createProjectElement(projectName);
        projectListContainer.appendChild(projectElement);

        // Add tasks to the project
        selectProject(projectName); // Select the project so tasks are added to it
        tasks.forEach(({ title, description, dueDate, priority }) => {
            addTodo(title, description, dueDate, priority);
        });

        console.log(`Project '${projectName}' added with ${tasks.length} tasks.`);
    });
});

// Select all nav items
const navItems = document.querySelectorAll('.nav-item');

// Add event listeners to each nav item
navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'active' class from all nav items
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // Add 'active' class to the clicked nav item
    item.classList.add('active');
  });
});