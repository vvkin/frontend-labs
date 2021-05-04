'use strict';

const getTodoBody = text => {
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

const getTodoItem = text => {
  const item = document.createElement('li');
  const body = getTodoBody(text);
  const remove = getTodoRemove(item);
  item.classList.add('todo__item');
  item.append(body, remove);
  return item;
};

const todoForm = document.getElementById('form');
const todoList = document.getElementsByClassName('todo')[0];
const todoInput = document.querySelector('.form__input');

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const todoBody = todoInput.value.trim();
  if (todoBody) {
    const todoItem = getTodoItem(todoBody);
    todoList.append(todoItem);
    todoInput.value = '';
  }
});
