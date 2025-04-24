// This module will handle saving and loading data (e.g., from localStorage or a backend API)

const TASKS_KEY = "taskive_tasks";
const PROJECTS_KEY = "taskive_projects";

// Save tasks to localStorage
const saveTasks = (tasks) => {
    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Failed to save tasks to storage:", error);
    }
};

// Load tasks from localStorage
const loadTasks = () => {
    try {
        const tasksData = localStorage.getItem(TASKS_KEY);
        return tasksData ? JSON.parse(tasksData) : [];
    } catch (error) {
        console.error("Failed to load tasks from storage:", error);
        return [];
    }
};

// Save projects to localStorage
const saveProjects = (projects) => {
    try {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to save projects to storage:", error);
    }
};

// Load projects from localStorage
const loadProjects = () => {
    try {
        const projectsData = localStorage.getItem(PROJECTS_KEY);
        return projectsData ? JSON.parse(projectsData) : [];
    } catch (error) {
        console.error("Failed to load projects from storage:", error);
        return [];
    }
};

export { saveTasks, loadTasks, saveProjects, loadProjects };