const input = document.querySelector('#txtHere');
const addBtn = document.querySelector('.addBtn');
const filter = document.querySelector('.filter');
const ul = document.querySelector('.todo-list');
const h1 = document.querySelector('h1');

// time and date 
const date = new Date();
const hours = date.getHours();

// greetings
if (hours >= 18) {
  h1.textContent = 'Good Evening';
  document.body.classList.add('night-mode');
  addBtn.classList.add('night-mode');
} else if (hours >= 12) {
  h1.textContent = 'Good Afternoon';
} else {
  h1.textContent = 'Good Morning';
}

// add event listeners
document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', addItem);
ul.addEventListener('click', checkItem);
filter.addEventListener('click', updateList);

// function to add an item to the list
function addItem(e) {
  e.preventDefault();

  const inputValue = input.value.trim();

  if (!inputValue) {
    alert('Please enter an item');
    return;
  }

  const li = document.createElement('li');
  const divNew = document.createElement('div')
  const check = document.createElement('a');
  const trash = document.createElement('a');

  li.className = 'todo-list-element';
  divNew.className = 'elBtn';
  check.className = 'check';
  trash.className = 'trash';

  li.textContent = inputValue;
  check.textContent = '✓';
  trash.textContent = '×';

  divNew.append(check);
  divNew.append(trash);
  li.append(divNew);
  ul.append(li);

  saveLocalTodos(inputValue);

  input.value = '';
}

// function to check or delete an item from the list
function checkItem(e) {
  e.preventDefault();

  const el = e.target;
  const listItem = el.parentNode.parentNode;

  if (el.classList.contains('trash')) {
    if (confirm('Are you sure you want to delete this item?')) {
       
       removeLocalTodos(listItem);
       listItem.remove();
      
    }
  } else if (el.classList.contains('check')) {
    listItem.classList.toggle('completed');
  }
}
// function checkList(e) {
//     e.preventDefault();
//     let el = e.target;
//     let removeEl = el.parentNode.parentNode;
//     if (el.classList.contains('trash')) {
//       if (confirm('Are you sure?')) {
//         // remove the todo from local storage
//         const todoText = removeEl.innerText.trim();
//         removeLocalTodos(todoText);
//         removeEl.remove();
//       }
//     } else if (el.classList.contains('check')) {
//       removeEl.classList.toggle('completed');
//     }
//   }

// function to update the list based on the filter option selected
function updateList(e) {
  e.preventDefault();

  const items = ul.querySelectorAll('li');

  items.forEach(item => {
    switch (e.target.value) {
      case 'all':
        item.style.display = 'flex';
        break;
      case 'complete':
        item.classList.contains('completed')
          ? item.style.display = 'flex'
          : item.style.display = 'none';
        break;
      case 'incomplete':
        !item.classList.contains('completed')
          ? item.style.display = 'flex'
          : item.style.display = 'none';
        break;
    }
  });
}

// function to save a todo to local storage
function saveLocalTodos(todo) {
  let todos = [];

  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
      }
    
   todos.forEach(function(todo) {
    const li = document.createElement('li');
    const divNew = document.createElement('div')
    const check = document.createElement('a');
    const trash = document.createElement('a');

    li.className = 'todo-list-element';
    divNew.className = 'elBtn';
    check.className = 'check';
    trash.className = 'trash';

    li.textContent = todo;
    check.textContent = '✓';
    trash.textContent = '×';

    divNew.append(check);
    divNew.append(trash);
    li.append(divNew);
    ul.append(li);
   });
}

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.innerText.trim();
// const index = todos.indexOf(todoText);
    // const todoIndex = todo.innerText;
    todos.splice(todos.indexOf(todoIndex));
    localStorage.setItem('todos', JSON.stringify(todos));

    // console.log(todoIndex);
    // console.log(index);
}


// function removeLocalTodos(todo) {
//     let todos;
  
//     if (localStorage.getItem('todos')) {
//       todos = JSON.parse(localStorage.getItem('todos'));
//     } else {
//       return; // if there are no todos, there's nothing to remove
//     }
  
//     const todoText = todo.innerText.trim();
//     const index = todos.indexOf(todoText);
  
//     if (index > -1) { // if the todo is found in the array
//       todos.splice(index, 1); // remove the todo from the array
//       localStorage.setItem('todos', JSON.stringify(todos)); // update local storage
  
//       // shift the index of all subsequent items by one
//       for (let i = index; i < todos.length; i++) {
//         const todoText = todos[i];
//         const li = ul.children[i];
//         li.children[0].children[1].setAttribute('data-index', i);
//       }
//     }
//   }
