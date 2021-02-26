'use strict';

class TodoListView {
  static DELETE_BUTTON_SELECTOR = '.delete-button';
  static LIST_ITEM_SELECTOR = '.list-item';

  constructor(options) {
    this._$element = this.initView();
    this._options = options;
  }

  initView() {
    return $('<ul class = list-todos></ul>')
      .on(
        'click',
        TodoListView.DELETE_BUTTON_SELECTOR,
        ((element) => this.onDeleteButtonClick(element))
      )
      .on(
        'click',
        TodoListView.LIST_ITEM_SELECTOR,
        ((element) => this.onTodoClick(element))
      )
  }

  appendTo($container) {
    $container.append(this._$element);
  }

  renderTodosList(todosList) {
    const html = todosList.map(todo => this.generateTodoHtml(todo)).join('');
    this._$element.html(html);
  }

  generateTodoHtml(todo) {
    return `<li class = "list-item ${todo.completed ? 'checkedClass' : ''}" data-id = "${todo.id}">
              ${todo.title}
              <span class="delete-button">X</span>
            </li>`;
  }

  onDeleteButtonClick(event) {
    event.stopPropagation();
    const todoId = this.getTodoElementId(event.target);
    this._options.onDelete(todoId);
  }

  onTodoClick(event) {
    const todoId = this.getTodoElementId(event.target);
    this._options.onToggle(todoId);
  }

  getTodoElementId(element) {
    const parent = element.closest(TodoListView.LIST_ITEM_SELECTOR);
    return parent && parent.dataset.id;
  }
  
  removeTodo(todoId) {
    this._$element.find(`[data-id="${todoId}"]`).remove();
  }
  
  renderTodo(todo) {
    const todoHtml = this.generateTodoHtml(todo);
    this._$element.find(`[data-id="${todo.id}"]`).replaceWith(todoHtml);
  }

  // renderNewTodoForm(todo) {
  //   const todoFormHtml = this.generateTodoHtml(todo);
  //   this._$element.append(todoFormHtml);
  // }
}