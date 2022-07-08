import './style.css';
import storage from './localStorage.js';
import completed from './markCompletion.js';
import populateUI from './populateUI.js';

const todoList = [];

const populateScreen = () => {
  if (!JSON.parse(localStorage.getItem('todo-list'))) {
    storage.storetask(storage.sortindex(todoList));
  }
  // Display List of tasks in UI
  populateUI.displayList();

  // Set up checkbox event
  const checkboxes = document.querySelectorAll('.checkbox');

  [...checkboxes].forEach((button) => {
    button.addEventListener('change', completed);
  });

  // Event for Update Task
  const inputs = document.querySelectorAll('.description');
  [...inputs].forEach((input) => {
    input.addEventListener('focusout', storage.updateTask);
  });

  // Icon and Trash can toggle
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
      storage.remove(event);
      const oldList = document.querySelectorAll('.todoItem');
      [...oldList].forEach((e) => e.remove());
      populateScreen();
    });
  });
};

// Add Item in the list when user press enter after input
const input = document.querySelector('#additem');
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) { 
    storage.add(event);
    event.target.value = '';
    const oldList = document.querySelectorAll('.todoItem');
    [...oldList].forEach((e) => e.remove());
    populateScreen();
  }
});

// Remove Completed Tasks
const btn = document.querySelector('.clearAll-btn');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  storage.clearCompleted();
  const oldList = document.querySelectorAll('.todoItem');
  [...oldList].forEach((e) => e.remove());
  populateScreen();
});

populateScreen();