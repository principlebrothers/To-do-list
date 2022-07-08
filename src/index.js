import './style.css';
import localstore from './localstore.js';
import completed from './completedtasks.js';
import displayhtml from './displayhtml.js';

const todoList = [];

const renderUI = () => {
  if (!JSON.parse(localStorage.getItem('todo-list'))) {
    localstore.storetask(localstore.sortindex(todoList));
  }
  // Display List of tasks in UI
  displayhtml.displayList();
  // Event for Checkboxes
  const checkboxes = document.querySelectorAll('.checkbox');

  [...checkboxes].forEach((button) => {
    button.addEventListener('change', completed);
  });
  // Event for Update Task
  const inputs = document.querySelectorAll('.description');
  [...inputs].forEach((input) => {
    input.addEventListener('focusout', localstore.updateTask);
  });
  // Hide Ellipsis icon and display trash icon
  [...inputs].forEach((input) => {
    input.addEventListener('focus', (event) => {
      event.target.style.backgroundColor = '#fff4bf';
      event.target.parentElement.style.backgroundColor = '#fff4bf';
      event.target.nextSibling.classList.add('hideellipsis');
      event.target.nextSibling.nextSibling.classList.remove('hideellipsis');
    });
  });
  // Trash task from list
  const trashes = document.querySelectorAll('.fa-trash');
  [...trashes].forEach((trash) => {
    trash.addEventListener('click', (event) => {
      localstore.remove(event);
      const oldList = document.querySelectorAll('.todoItem');
      [...oldList].forEach((e) => e.remove());
      renderUI();
    });
  });
};
// Add Item in the list when user press enter after input
const input = document.querySelector('#additem');
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) { // Returns Enter Key
    localstore.add(event);
    event.target.value = '';
    const oldList = document.querySelectorAll('.todoItem');
    [...oldList].forEach((e) => e.remove());
    renderUI();
  }
});
// Remove Completed Tasks
const btn = document.querySelector('.btn');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  localstore.clearCompleted();
  const oldList = document.querySelectorAll('.todoItem');
  [...oldList].forEach((e) => e.remove());
  renderUI();
});

renderUI();