const inputbox = document.querySelector(".task-input input");
let filters = document.querySelectorAll(".filters span");
let todolist = document.querySelector(".item-list");
let clearall = document.querySelector(".clear-btn");
let add = document.querySelector("#addbutton");
let pendingTasks = document.querySelector(".pendingTasks");

document.addEventListener("DOMContentLoaded", () => showTask("all"));

// getting local storage todos
let todos = JSON.parse(localStorage.getItem("todos"));

// onkeyup event for hide and unhide Add button
inputbox.addEventListener("keyup", () => {
  let UserEnterValue = inputbox.value.trim(); //Store user entered value
  if (UserEnterValue) {
    //if the user value isn't only spaces
    add.style.display = "block"; //add button show
  } else {
    add.style.display = "none"; //add button hide
  }
});

// Onclick Event is used to save task in local storage
add.addEventListener("click", () => {
  let UserEnterValue = inputbox.value.trim();
  if (!todos) {
    todos = [];
  }
  inputbox.value = ""; //once task added the input field blank
  todos.push({ task: UserEnterValue, status: "incomplete" });
  localStorage.setItem("todos", JSON.stringify(todos));
  showTask(document.querySelector("span.active").id); // showtask call for add li tag in html etc.
});

// filtering task of the list
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTask(btn.id);
  });
});

// showTask function display all the added task
function showTask(filter) {
  let li = "";
  if (todos) {
    todos.forEach((todo, index) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li>
                    <label for="${index}">
                         <input onclick="statusUpdate(this)" type="checkbox" id="${index}" ${completed}/>
                         <span class="${completed}">${todo.task}</span>
                    </label>
                    <span class="icon" onclick="deleteTask(${index})">
                        <i class="del uil uil-plus-circle"></i>
                    </span>
                  </li>`;
      }
    });
  }
  pendingTasks.textContent = todos.length; //For toal left task counting
  todolist.innerHTML = li || "<span>you do not have any task here</span>"; //adding new li tag inside ul tag
  add.style.display = "none"; //Add button hide
  todolist.offsetHeight >= 300
    ? todolist.classList.add("overflow")
    : todolist.classList.remove("overflow");
}

// statusUpdate is used for updating status of the selectedTask in the localStorage
function statusUpdate(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.className = "";
    todos[selectedTask.id].status = "incomplete";
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Delete task function is used to remove the task from the list
function deleteTask(index) {
  todos.splice(index, 1); //remove task  from local storage
  localStorage.setItem("todos", JSON.stringify(todos));
  showTask("all");
}

// delete all tasks function is used for delete all task from your list
clearall.addEventListener("click", () => {
  todos.splice(0, todos.length); //remove task  from local storage
  localStorage.setItem("todos", JSON.stringify(todos));
  showTask("all");
});
