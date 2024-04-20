// this application is mostly based on a youtube tutorial: https://youtu.be/p6F5TBxs88A?si=a9k1Pv_7m0W2EgeM

const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
  const task = {
    text: taskInput.value,
    done: false,
  };

  if (task && taskInput.value.length > 0) {
    createTaskElement(task);
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Please enter a task");
  }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.textContent = task.text;
  listItem.classList.add("listItem");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("deleteTask");

  const checkedButton = document.createElement("button");
  checkedButton.innerText = "✔️";
  checkedButton.classList.add("checkedTask");

  listItem.appendChild(checkedButton);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  deleteButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
    saveTasks();
  });

  checkedButton.addEventListener("click", () => {
    task.done = !task.done;
    if (task.done) {
      listItem.style.color = "lightgreen";
    } else {
      listItem.style.color = "black";
    }
    saveTasks();
  });
  if (task.done) {
    listItem.style.color = "lightgreen";
  }
}

function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(function (item) {
    let task = {
      text: item.textContent.replace("X", "").replace("✔️", "").trim(),
      done: item.style.color === "lightgreen",
    };
    tasks.push(task);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createTaskElement);
}
