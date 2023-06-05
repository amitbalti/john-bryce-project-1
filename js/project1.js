document.addEventListener("DOMContentLoaded", function () {
  showTaskList();
});

const addTask = () => {
  var myTask = new Object();
  myTask.taskDesc = document.getElementById("taskDesc").value;
  var date = "";
  if (document.getElementById("desDate").value.length > 0) {
    // How to make the date into the relevant format I want.
    date = new Date(document.getElementById("desDate").value)
      .toJSON()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
  }
  myTask.desDate = date;
  myTask.desHour = document.getElementById("desHour").value;
  addTaskLocal(myTask);
  showTaskList(true); // When a new task is added to showTaskList
  document.getElementById("myForm").reset();
};

const getTaskList = () => {
  var taskList = [];
  var tasksData = localStorage.getItem("tasks");
  if (tasksData != null) {
    taskList = JSON.parse(tasksData); // If there is task in the tasksData, return JSON object in the taskList
  }
  return taskList;
};

const addTaskLocal = (task) => {
  var taskList = getTaskList();
  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList)); // Convert into string and store in localStorage
};

const deleteRow = (i) => {
  var taskList = getTaskList(); // Get task list from localStorage
  taskList.splice(i, 1); // Remove relevant task from localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList)); // Save new task list in localStorage
  var noteBox = event.target.parentNode; // Giving the parent element where the 'X' is clicked
  noteBox.classList.add("removed"); // Add 'removed' class
  setTimeout(() => {
    showTaskList(); // Show new task list with animation of the 'removed' class
  }, 500);
};

const showTaskList = (added) => {
  // 'added' param only when new task added
  var data = "";
  var taskList = getTaskList(); // Bring task list from localStorage
  taskList.map((item, i) => {
    // Only in case it's the last added item, add a newClass
    var newClass = "";
    if (added && i == taskList.length - 1) {
      newClass = "added";
    }
    data += `
      <div class="noteBox ${newClass}">
                <span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="deleteRow(${i})"></span>
                <div class="description">${item.taskDesc}</div>
                <div class="setDate">${item.desDate}</div>
                <div class="setHour">${item.desHour}</div>
            </div>
        `;
  });

  document.getElementById("stickyNote").innerHTML = data;
};
