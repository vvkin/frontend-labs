'use strict';

// PART I: DOM

const getTodoBody = (text, completed) => {
  const body = document.createElement('div');
  body.classList.add('todo__body');

  const span = document.createElement('span');
  span.innerText = text;
  span.classList.add('todo__text');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo__checkbox');
  checkbox.addEventListener('change', () => {
    span.classList.toggle('todo__completed');
  });

  if (completed) {
    span.classList.add('todo__completed');
    checkbox.checked = true;
  }

  body.append(checkbox, span);
  return body;
};

const getTodoRemove = item => {
  const remove = document.createElement('button');
  remove.classList.add('todo__remove');
  remove.innerHTML = '&times;';
  remove.addEventListener('click', () => item.remove());
  return remove;
};

const getTodoItem = (text, completed) => {
  const item = document.createElement('li');
  const body = getTodoBody(text, completed);
  const remove = getTodoRemove(item);
  item.classList.add('todo__item');
  item.append(body, remove);
  return item;
};

const todoForm = document.getElementById('form');
const todoList = document.getElementsByClassName('todo')[0];
const todoInput = document.querySelector('.form__input');

const addTodoItem = (text, completed) => {
  const todoItem = getTodoItem(text, completed);
  todoList.append(todoItem);
};

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const todoBody = todoInput.value.trim();
  if (todoBody) {
    addTodoItem(todoBody, false);
    todoInput.value = '';
  }
});

// PART II: AJAX

const Ajax = () => {
  const createRequest = (method, url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = () => {
      xhr.status === 200
        ? callback(xhr.response)
        : console.log(`Failed with status ${xhr.status}: ${xhr.statusText}`);
    };
    return xhr;
  };

  const get = (url, callback) => {
    const xhr = createRequest('GET', url, callback);
    xhr.responseType = 'json';
    xhr.send();
  };

  const post = (url, callback) => {
    const xhr = createRequest('POST', url, callback);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  };

  return { get, post };
};

const ajax = Ajax();

// json
ajax.get('db.json', todos => {
  for (const { text, completed } of todos) {
    addTodoItem(text, completed);
  }
});

// text
// ajax.get('db.json', response => {
//   const todos = JSON.parse(response);
//   for (const { text, completed } of todos) {
//     addTodoItem(text, completed);
//   }
// });
