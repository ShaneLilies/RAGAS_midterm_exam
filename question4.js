let tasks = []; // array to store tasks

function addTask(id, name, description) {
    tasks.push({ id, name, description }); // add a new task
}

function getTasks() {
    return tasks; // return all tasks
}

function updateTask(id, newName, newDescription) {
    let task = tasks.find(task => task.id === id); // find task by ID
    if (task) {
        task.name = newName;
        task.description = newDescription; // update task details
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id); // remove task by ID
}

// Example usage
addTask(1, "Task 1", "Description 1");
console.log(getTasks()); // display tasks
updateTask(1, "Updated Task 1", "Updated Description");
console.log(getTasks()); // display updated tasks
deleteTask(1);
console.log(getTasks());