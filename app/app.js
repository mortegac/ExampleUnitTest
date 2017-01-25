var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var todos = [];
var count = 1;

app.set('view engine', 'jade');
app.set('views', 'app');

app.use(express.static('public'));
app.use(bodyparser.json());

app.post('/todos', function(req, res) {
  var todo;

  todo = req.body;
  todo.id = count++;
  todos.push(todo);

  res.json(todo);
});

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  var id,
      i;

  id = +req.params.id;
  for (i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      break;
    }
  }

  res.json(todos[i]);
});

app.put('/todos/:id', function(req, res) {
  debugger
  var todo,
      id,
      i;

  id = +req.params.id;
  todo = req.body;
  for (i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      break;
    }
  }

  todos[i].title = todo.title;
  todos[i].done = todo.done;

  res.end(todos[i]);
});

app.delete('/todos/:id', function(req, res) {
  var todo,
      id,
      i;

  id = +req.params.id;
  for (i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      break;
    }
  }

  todo = todos[i];
  todos.splice(i, 1);
  res.json(todo);
});

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Express.js Todos'
  });
});

module.exports = app;
