'use strict';

class NewTodoFormView {

  constructor(options) {
    this._$elementForm = this.initFormView();
    this._options = options;
  }

  initFormView() {
    return $('<form class = "form-todo"></form>')
    .on(
      'submit',
      NewTodoFormView.FORM_TODO_SELECTOR,
      ((element) => this. onTodoFormSubmit(element))
    )
  }

  appendTo($container) {
    $container.append(this._$elementForm);
  }

  generateFormHtml() {
    return (`<input type="text" id="input-id"/>
            <button id="button" class = "add-button" type="submit">Add Todo</button>`)
  }

  renderTodoForm() {
    const html = this.generateFormHtml();
    this._$elementForm.html(html);
  }
  
  onTodoFormSubmit(event) {
    event.preventDefault();
    const newTodo = this.getFormData();
    this._options.onSave(newTodo);
    this.clearForm();
  }

  getFormData() {
    return {
      title: $('#input-id').val()
    }
  } 
  clearForm() {
    $('#input-id').val('');
  }
}