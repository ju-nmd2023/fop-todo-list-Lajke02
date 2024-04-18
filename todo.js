// be able to:
// - add tasks ✔️
// - Mark tasks as done ✔️
// - Delete tasks ✔️
// - Tasks should be stored in Local storage

//importing styles from CSS

//Some constants needed before creating a task
const addTaskButtonElement = document.getElementById("addTask");
const taskContainerElement = document.getElementById("tasks");
const inputElement = document.getElementById("input");

// clicking the button creates a task (add task)
addTaskButtonElement.addEventListener("click", () => {
  if (inputElement.value.length > 0) {
    createTask();
  }
});

//Creating a task and what it intails
function createTask() {
  const taskElement = document.createElement("div");
  taskElement.classList.add("taskDiv");
  taskContainerElement.appendChild(taskElement);

  const taskTextElement = document.createElement("p");
  taskTextElement.classList.add("task-element");
  taskTextElement.innerText = inputElement.value;
  taskElement.appendChild(taskTextElement);

  // clearing the textinput after writing a task
  inputElement.value = "";

  // the checked off button
  const checkedOffButtonElement = document.createElement("button");
  checkedOffButtonElement.classList.add("checked-button");
  checkedOffButtonElement.innerText = "✔️";
  taskElement.appendChild(checkedOffButtonElement);

  // makes the task field green to signify that it's done (mark as done)
  checkedOffButtonElement.addEventListener("click", () => {
    if (taskElement.style.backgroundColor !== "lightgreen") {
      taskElement.style.backgroundColor = "lightgreen";
    } else if (taskElement.style.backgroundColor !== "white") {
      taskElement.style.backgroundColor = "white";
    }
  });
  // delete button
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.classList.add("delete-button");
  deleteButtonElement.innerText = "✖️";
  taskElement.appendChild(deleteButtonElement);

  //makes task disappear into the void (delete task)
  deleteButtonElement.addEventListener("click", () => {
    taskContainerElement.removeChild(taskElement);
  });
}
