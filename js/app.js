// stats

/*
<span id="todo-count"><strong><%= remaining %></strong> <%= remaining == 1 ? 'item' : 'items' %> left</span>
  <ul id="filters">
    <li>
      <a class="selected" href="#/">All</a>
    </li>
    <li>
      <a href="#/active">Active</a>
    </li>
    <li>
      <a href="#/completed">Completed</a>
    </li>
  </ul>
  <% if ( completed ) { %>
    <button id="clear-completed">Clear completed</button>
  <% } %>
*/

// todos

/*
<li>
  <div class="view">
    <input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
    <label><%- title %></label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="<%- title %>">
</li>
*/
window.onload = function() {
  //input new-todo  add llama a render y renderea de nuevo
  var list = document.getElementById('todo-list');
  var newTodo = document.getElementById('new-todo');
  var todoId = 0;
  var todos = [];

  var add = function(inputValue) {

    var todo = {
      title: inputValue,
      checked: false,
      id: todoId
    };

    todoId++;
    todos.push(todo);
    // todo = {}
    // todos [{}, {}, {}]
    render(todo);
  }

  var onChange = function(event) {
    event.target // newTodo
    event.keyCode // 13

    // 13 es el código de Enter
    if (event.keyCode !== 13) {
      return;
    }
    var inputValue = event.target.value; // hello!
    console.log(inputValue);


    add(inputValue);
    event.target.value = '';
  };

    // renderea toda la lista
  var render = function(todo){

    var title = todo.title;
    var checked = todo.checked;
    var id = todo.id;
    
    var isChecked = checked ? 'checked' : '';
    var itemContent =
			'<div class="view">'+
				'<input class="toggle" type="checkbox" '+ isChecked + '>' +
				'<label>' + title + '</label>'+
				'<button class="destroy"></button>'+
			'</div>'+
      '<input class="edit" value="'+ title +'">';
      
    var li = document.createElement('li'); // en este momento se convierte en un elemento del DOM
    li.id = 'item-' + id;
    li.innerHTML = itemContent;

    li.addEventListener('dblclick', function(event){
      li.className = 'editing';
      var editButton = li.getElementsByClassName('edit')[0];
      editButton.focus();
    })

    var editButton = li.getElementsByClassName('edit')[0];
    editButton.addEventListener('focusout', function(event){
      update(event);
    })

    var destroyButton = li.getElementsByClassName('destroy')[0];

    destroyButton.addEventListener('click', function(event){
      var li = event.target.parentElement.parentElement;
      destroy(li);
    });
    
    // list.innerHTML = list.innerHTML + item;
    // list.innerHTML += item;
    list.appendChild(li); // 
  };

  // destruye una y renderea de nuevo
  var destroy = function(li){
    var id = li.id.split('-')[1];
    id = parseInt(id, 10);

    var i = 0;
    for( i; i < todos.length; i++ ) {
      if(todos[i].id == id){
        break; 
      }
    }

    todos.splice(i, 1);
    list.removeChild(li);
  };

  var update = function(event) {
    var editButton = event.currentTarget;
    var li = event.currentTarget.parentElement;
    var label = li.getElementsByTagName('label')[0];

    li.classList.remove('editing');
    label.innerHTML = editButton.value;

    var id = +li.id.split('-')[1];
    var todo;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todo = todos[i];
        break;
      }
    }

    todo.title = editButton.value;
  };

  // callback
  newTodo.addEventListener("keypress", onChange);
};