// Focus on utility-helpers functions

import { projectList, currentProject, todoList, Project, Todo } from "./models";

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

export { selectProject, getTodoForProject, getCurrentProject };
