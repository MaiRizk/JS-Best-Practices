import './style.css';
import {
  addTask, clearCompleted, deleteTask, editTask,
} from './function';

import onCheck from './status';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.localStorage.setItem('tasks', JSON.stringify(tasks));

const addTaskToUI = (ul, task) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  li.appendChild(checkbox);
  const input = document.createElement('input');
  input.value = task.description;
  li.appendChild(input);
  const remove = document.createElement('button');
  remove.innerHTML = '<i class="fas fa-trash-alt"></i>';
  li.appendChild(remove);
  ul.appendChild(li);

  input.addEventListener('blur', (e) => {
    editTask(task.index - 1, e.target.value);
  });

  checkbox.addEventListener('change', () => {
    onCheck(task.index - 1);
  });
  remove.addEventListener('click', () => {
    li.parentNode.removeChild(li);
    deleteTask(task.index);
  });
};

function listItems() {
  const ul = document.getElementById('list');
  tasks.forEach((task) => {
    addTaskToUI(ul, task);
  });
}

listItems();

document.getElementById('description').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

document.getElementById('clear-all').addEventListener('click', () => {
  clearCompleted();
});
