export default (() => {
  const sortindex = (todoList) => todoList.map((item, index) => {
    item.index = index;
    return item;
  });
  // Store Tasks in Local Storage //
  const storetask = (todoList) => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  };

  const gettasks = () => JSON.parse(localStorage.getItem('todo-list'));
  // Tasks in the list
  const add = (event) => {
    const list = gettasks();
    list.push({ description: event.target.value, completed: false, index: 0 });
    storetask(sortindex(list));
  };
  // Update Tasks
  const updateTask = (event) => {
    setTimeout(() => {
      event.target.style.backgroundColor = '#fff';
      event.target.parentElement.style.backgroundColor = '#fff';
      event.target.nextSibling.nextSibling.classList.add('hideellipsis');
      event.target.nextSibling.classList.remove('hideellipsis');
    }, 200);
    const list = gettasks();
    const index = event.target.getAttribute('data-index');
    list[index].description = event.target.value;
    storetask(list);
  };
  // Remove Tasks
  const remove = (event) => {
    const list = gettasks();
    const index = event.target.getAttribute('data-index');
    list.splice(index, 1);
    storetask(sortindex(list));
  };
  // Clear Completed tasks
  const clearCompleted = () => {
    const list = gettasks();
    const newList = list.filter((e) => e.completed === false);
    storetask(sortindex(newList));
  };
  // Return functions
  return {
    sortindex,
    storetask,
    gettasks,
    add,
    updateTask,
    remove,
    clearCompleted,

  };
})();