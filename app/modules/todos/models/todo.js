
  Tranquil.Todo = DS.Model.extend({
    name: DS.attr('string'),
    isDone: DS.attr('boolean')
  });

  Tranquil.Todo.FIXTURES = [{
    id: 'a',
    name: 'Walk the dog',
    isDone: false
  }, {
    id: 'b',
    name: 'Buy groceries',
    isDone: false
  }]; 
