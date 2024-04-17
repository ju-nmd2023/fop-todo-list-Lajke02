// be able to:
// - add tasks
// - Mark tasks as done
// - Delete tasks
// - Tasks should be stored in Local storage

//importing styles from CSS

//Some constants
const addTaskButtonElement = document.getElementById("addTask");
const taskContainerElement = document.getElementById("tasks");
const inputElement = document.getElementById("input");

// clicking the button creates a task
addTaskButtonElement.addEventListener("click", () => {
  if (inputElement.value.length > 0) {
    createTask();
  }
});

function createTask() {
  const taskElement = document.createElement("div");
  taskElement.classList.add("taskDiv");
  taskContainerElement.appendChild(taskElement);

  const taskTextElement = document.createElement("p");
  taskTextElement.classList.add("task-element");
  taskTextElement.innerText = inputElement.value;
  taskElement.appendChild(taskTextElement);

  inputElement.value = "";

  const checkedOffButtonElement = document.createElement("button");
  checkedOffButtonElement.classList.add("checked-button");
  checkedOffButtonElement.innerText = "✔️";
  taskElement.appendChild(checkedOffButtonElement);

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.classList.add("delete-button");
  deleteButtonElement.innerText = "✖️";
  taskElement.appendChild(deleteButtonElement);

  deleteButtonElement.addEventListener("click", () => {
    taskContainerElement.removeChild(taskElement);
  });
}
