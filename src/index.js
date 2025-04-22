// Stores all the projects 
const myProjects = [];

// Tasks constructor
class Task {
    constructor (title, description, dueDate, priority, notes, checkList) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date (dueDate);
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }
};

// Add new task
const addNewTask = (title, description, dueDate, priority, notes, checkList) => {
    const newTask = new Task(title, description, dueDate, priority, notes, checkList);
    myProjects.push(newTask);
};

// Remove item from array
let deleteTask = (title) => {
    let index = myProjects.findIndex(task => task.title === title);
    if (index !== -1) {
        myProjects.splice(index, 1); // Removes the task at the found index
        console.log(`Task with title "${title}" has been deleted.`);
    } else {
        console.log('Task not found!');
    }
};

// Edit array objects by title and field
let editTask = (title, field, newValue) => {
    // Find the task by its title
    let task = myProjects.find(task => task.title === title);

    if (!task) {
        console.log('Item was not found!');
    } else {
        // Check if the field exists on the task object
        if (task.hasOwnProperty(field)) {
            task[field] = newValue; // Update the field with the new value
        } else {
            console.log(`Field "${field}" does not exist on the task.`);
        }
    }
};

// Example usage
addNewTask('Testing 123', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');

editTask('Testing 123', 'description', 'Updated description here');
editTask('Testing 123', 'priority', 'Low');

console.table(myProjects); // Check updated tasks