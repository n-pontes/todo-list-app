// Stores all the projects 
const myProjects = [];

// Tasks constructor
class Task {
    constructor (title, description, dueDate, priority, notes, checkList) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
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

addNewTask('Workout', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');
addNewTask('Workout', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');
addNewTask('Workout', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');
addNewTask('Workout', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');
addNewTask('Workout', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');
addNewTask('Workout', 'I have to workout', '21-20-2025', 'High', 'Dont forget', 'Check it');

console.table(myProjects);