// this application is mostly based on a youtube tutorial: https://youtu.be/p6F5TBxs88A?si=a9k1Pv_7m0W2EgeM

//constants
const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

//load localstorage so previous task appear if not checked
loadTasks();

//Adding tasks
function addTask() {
  const task = {
    text: taskInput.value,
    done: false,
  };
  //Only save task if the input is not empty, otherwise alert.
  if (task && taskInput.value.length > 0) {
    createTaskElement(task);
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Please enter a task");
  }
}

//listens for the button click to add task
addButton.addEventListener("click", addTask);

function createTaskElement(task) {
  //creates a listelement(task)
  const listItem = document.createElement("li");
  //the textcontent of the listitem match the textobject of task
  listItem.textContent = task.text;
  //adds css-class
  listItem.classList.add("listItem");

  //creates a delete-button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("deleteTask");

  const checkedButton = document.createElement("button");
  checkedButton.innerText = "✔️";
  checkedButton.classList.add("checkedTask");

  //add all buttons and listitem
  listItem.appendChild(checkedButton);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  //clicking the deletebutton deletes the listitem(task)
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
    //save the changes to the localstorage
    saveTasks();
  });

  checkedButton.addEventListener("click", () => {
    //check if task is done
    task.done = !task.done;
    //if task is done the color should change to green otherwise left black
    if (task.done) {
      listItem.style.color = "lightgreen";
    } else {
      listItem.style.color = "black";
    }
    //save changes to localstorage
    saveTasks();
  });
  //check again if the task is done
  if (task.done) {
    listItem.style.color = "lightgreen";
  }
}

function saveTasks() {
  //tasks are gathered in the tasks-array
  let tasks = [];
  //Pushes each listelement into the array
  taskList.querySelectorAll("li").forEach(function (item) {
    let task = {
      text: item.textContent.replace("X", "").replace("✔️", "").trim(),
      done: item.style.color === "lightgreen",
    };
    tasks.push(task);
  });
  //Turns array to json format (saves it in localstorage)
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  //turns json to array again so it is displayed; if there is nothing the array will be empty
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //recreates all localstorage tasks from the array to li-elements
  tasks.forEach(createTaskElement);
}
