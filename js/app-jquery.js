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
$(document).ready(function () {

  var list = $('#todo-list');
  var newTodo = $('#new-todo');
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

    render(todo);
  }

  var onChange = function(event) {
    // 13 es el código de Enter
    if (event.which !== 13) {
      return;
    }
    var inputValue = $(this).val();
    console.log(inputValue);

    add(inputValue);
    $(this).val('');
  };

  var render = function(todo){

    var title = todo.title;
    var checked = todo.checked;
    var id = todo.id;
    
    var isChecked = checked ? 'checked' : '';
    var $li = $(
			'<li>'+
        '<div class="view">'+
          '<input class="toggle" type="checkbox" '+ isChecked + '>' +
          '<label>' + title + '</label>'+
          '<button class="destroy"></button>'+
        '</div>'+
        '<input class="edit" value="'+ title +'">'+
      '</li>'
    );
    $li.attr('id', 'item-' + id);

    $li.on('dblclick', function(){
      $(this).addClass('editing');
      var editButton = $li.find('.edit');
      editButton.focus();
    })

    var editButton = $li.find('.edit');
    editButton.on('focusout', update);

    var destroyButton = $li.find('.destroy');
    destroyButton.on('click', destroy);
    
    list.append($li);
  };

  var destroy = function(){

    var $li = $(this).closest('li');
    var id = $li.attr('id').split('-')[1];
    id = parseInt(id, 10);

    var i = 0;
    for( i; i < todos.length; i++ ) {
      if(todos[i].id == id){
        break; 
      }
    }
    todos.splice(i, 1);

    $li.remove();
  };

  var update = function(event) {
    var val = $(this).val();
    var $li = $(this).closest('li');
    var $label = $li.find('label');

    $li.removeClass('editing');
    $label.text(val);

    var id = +$li.attr('id').split('-')[1];
    var todo;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todo = todos[i];
        break;
      }
    }

    todo.title = val;
  };

  // callback
  newTodo.on('keypress', onChange);
});