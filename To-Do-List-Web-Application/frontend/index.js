// JavaScript for the To-Do List Application

let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("task");
    const priorityInput = document.getElementById("priority");
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;

    if (taskText === "") return;

    const newTask = {
        text: taskText,
        priority: priority,
        status: "pending",
        timestamp: new Date().getTime(),
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    displayTasks();
    taskInput.value = "";
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";

    for (const task of tasks) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="${task.status === 'completed' ? 'completed' : ''}">${task.text}</span>
            <span class="priority">${task.priority}</span>
            <button style="color: white;background-color: green"onclick="markComplete(${task.timestamp})">Complete</button>
            <button style="color: white ;background-color: #07058c"onclick="editTask(${task.timestamp})">Edit</button>
            <button style="color: white ;background-color: rgba(255, 0, 0, 0.8)"onclick="deleteTask(${task.timestamp})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    }
}

// Function to mark a task as completed
function markComplete(timestamp) {
    const taskIndex = tasks.findIndex(task => task.timestamp === timestamp);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = "completed";
        saveTasksToLocalStorage();
        displayTasks();
    }
}

// Function to edit a task
function editTask(timestamp) {
    const taskIndex = tasks.findIndex(task => task.timestamp === timestamp);
    if (taskIndex !== -1) {
        const newText = prompt("Edit task:", tasks[taskIndex].text);
        if (newText !== null) {
            tasks[taskIndex].text = newText;
            saveTasksToLocalStorage();
            displayTasks();
        }
    }
}

// Function to delete a task
function deleteTask(timestamp) {
    tasks = tasks.filter(task => task.timestamp !== timestamp);
    saveTasksToLocalStorage();
    displayTasks();
}

// Function to filter tasks by status
function filterTasks() {
    const filterStatus = document.getElementById("filterStatus").value;
    if (filterStatus === "all") {
        displayTasks();
    } else {
        const filteredTasks = tasks.filter(task => task.status === filterStatus);
        displayFilteredTasks(filteredTasks);
    }
}

// Function to display filtered tasks
function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";

    for (const task of filteredTasks) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="${task.status === 'completed' ? 'completed' : ''}">${task.text}</span>
            <span class="priority">${task.priority}</span>
            <button onclick="markComplete(${task.timestamp})">Complete</button>
            <button onclick="editTask(${task.timestamp})">Edit</button>
            <button onclick="deleteTask(${task.timestamp})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    }
}

// Function to sort tasks
function sortTasks() {
    const sortOption = document.getElementById("sort").value;
    if (sortOption === "priority") {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (sortOption === "duedate") {
        tasks.sort((a, b) => a.timestamp - b.timestamp);
    }
    displayTasks();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }
}

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
