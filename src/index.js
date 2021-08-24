import "./styles.css";
import Completed from "./modules/complete.js";

const todoList = document.querySelector(".item");
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const displayList = () => {
  todo.forEach((item, index) => {
    const isCompleted = item.completed ? "checked" : "";
    const check = item.completed ? "check" : "";
    item.index = index; 
    todoList.innerHTML += `<li class="list-group-item task" id="${item.index}"><input type="checkbox" class="checkbox" ${isCompleted}>
    <input type="text" class="task-desc ${check}" value='${item.description}'>
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </li>`;
  });
  Completed.completeTask(todo);
};

displayList();

const clearItem  = () => {
  const todoList = document.querySelector(".item");
  todoList.innerHTML = '';
}

const clearAndDisplayItems = () => {
  return (
    clearItem(),
    displayList()
  )
}

const addTask = () => {
  const input = document.querySelector('.todo-input');
  input.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
      const task = input.value;
      if(task) {
        const addedTask = {
          description : task,
          completed : false,
          index : todo.length
        }
        todo.push(addedTask);
        clearAndDisplayItems();
        Completed.updateLocalStorage(todo);
      }
      input.value = '';
      e.preventDefault();
    }
  })
}

addTask()

const deleteTask =  () => {
  const deleteIcon = document.querySelector('.fa-ellipsis-v');
  deleteIcon.addEventListener('click', (e) => {
  const target = e.target;
  if (target) {
    todo = todo.filter((item) => item.index !== parseInt(target.parentNode.id));
    clearAndDisplayItems();
    Completed.updateLocalStorage(todo);
  }
  e.preventDefault();
  });
}

deleteTask();

const editTask = () => {
  const taskDescr = document.querySelectorAll('.task-desc');
  taskDescr.forEach((task, index) => {
    task.addEventListener('keydown', (e) => {
      const { value } = task;
      if (e.key === 'Enter' && value !== '') {
        todo[index].description = value;
        todoList.innerHTML = '';
        displayList();
        Completed.updateLocalStorage(todo);
      }
    });
  });
}

editTask();

const clearAll = () => {
  const clearSelected = document.querySelector('#clearSelected');
  clearSelected.addEventListener('click', () => {
    todo = todo.filter((task) => !task.completed);
    clearAndDisplayItems();
    Completed.updateLocalStorage(todo);
  })
}

clearAll();
