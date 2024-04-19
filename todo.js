//Some constants needed before creating a task
const addTaskButtonElement = document.getElementById("addTask");
const taskContainerElement = document.getElementById("tasks");
const inputElement = document.getElementById("input");

let tasks = [];
let task;

// clicking the button creates a task (add task)
addTaskButtonElement.addEventListener("click", () => {
  if (inputElement.value.length > 0) {
    createTask();
  }
});

//Creating a task and what it intails
function createTask() {
  let done = false;

  const taskElement = document.createElement("div");
  taskElement.classList.add("taskDiv");
  taskContainerElement.appendChild(taskElement);

  const taskTextElement = document.createElement("p");
  taskTextElement.classList.add("task-element");
  taskTextElement.innerText = inputElement.value;
  taskElement.appendChild(taskTextElement);
  saveTasks(inputElement.value, done);

  inputElement.value = "";

  const checkedOffButtonElement = document.createElement("button");
  checkedOffButtonElement.classList.add("checked-button");
  checkedOffButtonElement.innerText = "✔️";
  taskElement.appendChild(checkedOffButtonElement);

  checkedOffButtonElement.addEventListener("click", () => {
    if (taskElement.style.backgroundColor !== "lightgreen") {
      taskElement.style.backgroundColor = "lightgreen";
      done = true;
    } else if (taskElement.style.backgroundColor === "lightgreen") {
      taskElement.style.backgroundColor = "white";
      done = false;
    }
  });

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.classList.add("delete-button");
  deleteButtonElement.innerText = "✖️";
  taskElement.appendChild(deleteButtonElement);

  //makes task disappear into the void (delete task)
  deleteButtonElement.addEventListener("click", () => {
    taskContainerElement.removeChild(taskElement);
    let taskArray = JSON.parse(localStorage.getItem("task"));

    let index = taskArray.findIndex(
      (task) => task.text === taskTextElement.innerText
    );
    if (index !== -1) {
      taskArray.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(taskArray));
      displayTasks();
    }
    displayTasks();
  });
}

function saveTasks(text, done) {
  const task = {
    text: text,
    done: done,
  };

  if (localStorage.task === undefined) {
    localStorage.task = JSON.stringify([]);
  }

  tasks = JSON.parse(localStorage.getItem("task"));
  tasks.push(task);

  localStorage.setItem("task", JSON.stringify(tasks));
  displayTasks();
}

function displayTasks() {
  if (localStorage.task !== undefined) {
    taskContainerElement.innerHTML = "";

    let taskArray = JSON.parse(localStorage.getItem("task"));

    for (task of taskArray) {
      const taskElement = document.createElement("div");
      taskElement.classList.add("taskDiv");
      taskContainerElement.appendChild(taskElement);

      const taskTextElement = document.createElement("p");
      taskTextElement.classList.add("task-element");
      taskTextElement.innerText = task.text;
      taskElement.appendChild(taskTextElement);

      if (task.done === true) {
        taskElement.style.backgroundColor = "lightgreen";
      } else if (task.done === false) {
        taskElement.style.backgroundColor = "white";
      }

      const checkedOffButtonElement = document.createElement("button");
      checkedOffButtonElement.classList.add("checked-button");
      checkedOffButtonElement.innerText = "✔️";
      taskElement.appendChild(checkedOffButtonElement);

      checkedOffButtonElement.addEventListener("click", () => {
        let taskArray = JSON.parse(localStorage.getItem("task"));

        let index = taskArray.findIndex(
          (task) => task.text === taskTextElement.innerText
        );

        if (index !== -1) {
          taskArray.splice(index, 1);
          localStorage.setItem("task", JSON.stringify(taskArray));
          displayTasks();
        }
        if (taskElement.style.backgroundColor !== "lightgreen") {
          taskElement.style.backgroundColor = "lightgreen";
          task.done = true;
        } else {
          taskElement.style.backgroundColor = "white";
          task.done = false;
        }

        if (task.done === true) {
          taskElement.style.backgroundColor = "lightgreen";
        } else if (task.done === false) {
          taskElement.style.backgroundColor = "white";
        }

        saveTasks(task.text, task.done);
        displayTasks();
      });

      const deleteButtonElement = document.createElement("button");
      deleteButtonElement.classList.add("delete-button");
      deleteButtonElement.innerText = "✖️";
      taskElement.appendChild(deleteButtonElement);

      deleteButtonElement.addEventListener("click", () => {
        taskContainerElement.removeChild(taskElement);
        let taskArray = JSON.parse(localStorage.getItem("task"));
        let index = taskArray.findIndex(
          (task) => task.text === taskTextElement.innerText
        );

        if (index !== -1) {
          taskArray.splice(index, 1);
          localStorage.setItem("task", JSON.stringify(taskArray));
          displayTasks();
        }
        displayTasks();
      });
    }
  }
}
window.addEventListener("load", loadHandler);

function loadHandler() {
  displayTasks();
}
