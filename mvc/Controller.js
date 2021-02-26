'use strict';

const API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io';
const TODOS_URL = API_URL + '/todos';

class Controller {
  constructor($container) {
    this.$container = $container;

    this.todosCollection = new TodosCollection(TODOS_URL);
    this.todosCollection.getFetchTodoList()
    .then(() => { 
      this.renderList();
    });

    this.todoListView = new TodoListView({
      onDelete: (id) => this.deleteTodo(id),
      onToggle: (id) => this.toggleTodo(id)
    });
    this.todoListView.appendTo($container);

    this.newTodoFormView = new NewTodoFormView({
      onSave: (todo) => this.addTodo(todo),
    });
    this.newTodoFormView.renderTodoForm();
    this.newTodoFormView.appendTo($container);
  }

  renderList() {
    this.todoListView.renderTodosList(this.todosCollection.getTodosList());
  }

  deleteTodo(todoId) {
    this.todosCollection.delete(todoId)
    .then(() => this.todoListView.removeTodo(todoId));
  }

  toggleTodo(todoId) {
    this.todosCollection.toggle(todoId)
    .then(() => this.todoListView.renderTodo(this.todosCollection.get(todoId)));
  }

  addTodo(todo) {
    this.todosCollection.add(todo)
    .then(() => this.renderList());
    // .then(() => this.todoListView.renderNewTodoForm(todo));
  }
}