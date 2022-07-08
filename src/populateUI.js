import localstore from './localStorage.js';

export default (() => {
  const addListItem = (item) => {
    const newItem = document.createElement('li');
    newItem.classList.add('todoItem');
    const newIcon = document.createElement('i');
    newIcon.classList.add('fa', 'fa-ellipsis-v');
    const newIconTrash = document.createElement('i');
    newIconTrash.classList.add('fa', 'fa-trash', 'hideellipsis');
    newIconTrash.setAttribute('data-index', item.index);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.id = item.index;
    checkbox.classList.add('checkbox');
    const inputDesc = document.createElement('input');
    inputDesc.type = 'text';
    inputDesc.setAttribute('data-index', item.index);
    inputDesc.value = item.description;
    inputDesc.classList.add('description');
    newItem.appendChild(checkbox);
    newItem.appendChild(inputDesc);
    newItem.appendChild(newIcon);
    newItem.appendChild(newIconTrash);

    const btn = document.querySelector('.btn');
    const list = document.querySelector('#todo-list');
    list.insertBefore(newItem, btn);
  };
  // Display List
  const displayList = () => {
    const LocalStoragelist = localstore.getData();
    LocalStoragelist.forEach((item) => {
      addListItem(item);
    });
  };

  return {
    displayList,
    addListItem,
  };
})();