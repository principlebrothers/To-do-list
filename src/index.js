import './style.css';

const items = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Complete To Do List project',
    completed: false,
    index: 2,
  },
  {
    description: 'Watch Documentary ',
    completed: false,
    index: 3,
  },
  {
    description: 'Family meeting',
    completed: false,
    index: 4,
  },
];

const createList = () => {
  const listContainer = document.querySelector('.todo-container');
  const unorderedList = document.createElement('ul');
  unorderedList.classList.add('listItems');
  listContainer.appendChild(unorderedList);

  items.forEach((task) => {
    const list = document.createElement('li');
    list.classList.add('list');
    list.innerHTML = `
    <div class='task-container'>
      <div class='task'>
        <input class="checkbox" type="checkbox"/>
        <label id="${task.index}" class="label">${task.description}</label> 
      </div>  
      <i class="fa-solid fa-ellipsis-vertical fa-icon"></i>
    </div>`;
    unorderedList.appendChild(list);
  });
};
createList();