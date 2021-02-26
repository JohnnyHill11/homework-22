'use strict';

class TodosCollection {
  constructor(url) {
    this._url = url;
    this._todosList = [];
  }

  getFetchTodoList() {
    return fetch(this._url)
    .then((response) => response.json())
    .then((data) => this.setData(data));
  }

  setData(data) {
    this._todosList = data;
  }

  getTodosList() {
    return this._todosList;
  }

  delete(todoId) {
    fetch(this._url + '/' + todoId, {
      method: 'DELETE'
    });
    this._todosList = this._todosList.filter(todo => todo.id !== todoId);
    return Promise.resolve();
  }

  toggle(todoId) {
    const todo = this.get(todoId);
    todo.completed = !todo.completed
    fetch(this._url + '/' + todoId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json' 
        },
      body: JSON.stringify(todo),
    });
    return Promise.resolve();
  }

  add(todo) {
    todo.completed = false;
  return  fetch(this._url, {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json' 
        },
      body: JSON.stringify(todo),
    })
    .then((response) => response.json())
    .then((todo) => this._todosList.push(todo));
  }

  get(todoId) {
    return this._todosList.find((todo) => todo.id === todoId);
  }

}