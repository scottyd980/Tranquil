(function() {

/* global window, Ember */
window.Tranquil = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_BINDINGS: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_STACKTRACE_ON_DEPRECATION: true,
	LOG_VERSION: true,
	debugMode: true
});

Tranquil.Auth = Em.Auth.extend({
	request: 'jquery',
	response: 'json',
	strategy: 'token',
	signInEndPoint: '/api/auth/login',
	signOutEndPoint: '/api/auth/logout',
	tokenKey: 'auth_token',
	tokenLocation: 'param',
	tokenIdKey: 'user_id',
	session: 'cookie',
	modules: [
		'actionRedirectable',
		'authRedirectable',
		'rememberable'
	],
	rememberable: {
		tokenKey: 'remember_token',
		period: '14',
		autoRecall: true
	},
	authRedirectable: {
		route: 'auth.login'
	}
});

Tranquil.AuthenticatedRoute = Ember.Route.extend({
	authRedirectable: true,
	beforeModel: function () {
        this._super.apply(this, arguments);
    }
});

// Load mixins and components before anything else


})();

(function() {

Tranquil.TodoItemComponent = Ember.Component.extend({
  item: null,

  keyDown: function (event) {
    if (event.which === 13) {
      event.preventDefault();

      var item = this.get('item'),
        editable = this.$('.todo-editable');
      item.set('name', editable.text());
      
      item.save();
      

      editable.prop('contenteditable', false).blur();
    }
  },

  actions: {
    edit: function () {
      this.$('.todo-editable').prop('contenteditable', true).focus();
    },

    delete: function () {
      var item = this.get('item');
      
      item.deleteRecord();
      //item.save();
      
    }
  }
});


})();

(function() {


Tranquil.ApplicationAdapter = DS.FixtureAdapter.extend();



})();

(function() {


Tranquil.Site = DS.Model.extend({
  title: DS.attr('string'),
  link: DS.attr('string')
});

Tranquil.Site.FIXTURES = [
  {
    id: 1,
    title: 'About',
    link: 'about'
  },
  {
    id: 2,
    title: 'Contact',
    link: 'contact'
  },
  {
    id: 3,
    title: 'Todos',
    link: 'todos'
  }
];



})();

(function() {


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


})();

(function() {

Tranquil.AuthLoginRoute = Ember.Route.extend({
});

})();

(function() {

Tranquil.AuthSignupRoute = Ember.Route.extend({
	setupController: function( controller, context ) {
		controller.reset();
	}
});

})();

(function() {

Tranquil.AboutRoute = Tranquil.AuthenticatedRoute.extend({

	// beforeModel: function() {
	// 	this._super.apply(this, arguments);
	// }


});


})();

(function() {

Tranquil.ApplicationRoute = Ember.Route.extend({
});


})();

(function() {

Tranquil.TodosRoute = Ember.Route.extend({
  model: function(params) { 
      return this.store.find('todo'); 
  }
});


})();

(function() {

Tranquil.AuthLoginController = Ember.Controller.extend({
	// Properties
	username: null,
	password: null,
	remember: true,

	// Methods

	// Actions
	actions: {
		signIn: function() {

			this.auth.signIn({
				data: {
					username: this.get('username'),
					password: this.get('password'),
					remember: this.get('remember')
				}
			}).then(function(response) {
				console.log(response);
			}).fail(function(response) {
				console.log(response);
			});
			
		}
	}
});

})();

(function() {

Tranquil.AuthSignupController = Ember.Controller.extend({

	// Methods
	reset: function() {
		this.setProperties({
			fullname: "",
			email: "",
			username: "",
			password: ""
		});

		this.resetErrors();
	},

	resetErrors: function() {
		this.setProperties({
			errorMessage: "",
			fullnameError: "",
			emailError: "",
			passwordError: "",
			usernameError: ""
		});
	},

	// Actions
	actions: {
		signup: function() {

			var self = this, data = this.getProperties('fullname', 'email', 'username', 'password');

			$.post('/api/auth/signup', { user: data }, function(results) {

				// Login the user once saved
				if(!results.success) {
					
					// var errors = results.err.errors;
					// $.each(errors, function( key, value ) {
					// 	switch(key) {
					// 		case 'fullname':
					// 			if( value.type === "required" ) {
					// 				self.set( key + 'Error', 'A full name is required.');
					// 			}
					// 			break;
					// 		case 'email':
					// 			if( value.type === "required" ) {
					// 				self.set( key + 'Error', 'An email is required.');
					// 			} else if( value.type === "unique" ) {
					// 				self.set( key + 'Error', 'That email is already in use.');
					// 			}
					// 			break;
					// 		case 'username':
					// 			if( value.type === "required" ) {
					// 				self.set( key + 'Error', 'A username is required.');
					// 			} else if( value.type === "unique" ) {
					// 				self.set( key + 'Error', 'That username is already in use.');
					// 			}
					// 			break;
					// 		case 'password':
					// 			if(value.type === "required") {
					// 				self.set( key + 'Error', 'A password is required.');
					// 			}
					// 			break;
					// 		default:
					// 			break;
					// 	}
					// });

				} else {
					
				}

		    });
		}
	}
});


})();

(function() {

Tranquil.AboutController = Ember.Controller.extend({
	someText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque libero massa, mollis.',
	actions: {
		signIn: function() {
			this.auth.signIn({
				data: {
					email: "scott@scottyd.net",
					password: "test"
				}
			});
		}
	}
});

})();

(function() {

Tranquil.ApplicationController = Ember.ArrayController.extend({
});

})();

(function() {

Tranquil.TodosIndexController = Ember.Controller.extend({
  needs: ['todos'],

  actions: {
    newTodo: function() { 
        var newTodo = this.store.createRecord('todo', {
          name: 'Get r done'
        });
        newTodo.save(); 
    },

    clearDone: function() {
      var todos = this.get('controllers.todos');
      var allDone = todos.filter(function(todo) {
        return todo.get('isDone');
      });

      while (allDone.length > 0) {
        var todo = allDone.pop(); 
          todo.deleteRecord();
          todo.save(); 
      }
    }
  }
});


})();

(function() {

Tranquil.TodosController = Ember.ArrayController.extend({
});

})();

(function() {

Tranquil.IndexView = Ember.View.extend({
});

})();

(function() {

Ember.Handlebars.registerBoundHelper('wordCount', function (value) {
  var ret;
  if (typeof value === 'string' && value.length) {
    return ((ret = value.trim().match(/\s+/g).length) > 0) ? (ret + 1) : 1;
  }
  return '0';
});

})();

(function() {

Tranquil.Router.map(function() {
	this.route('about', { path: '/about' });
	this.route('pricing', { path: '/pricing' });
	this.route('dashboard', { path: '/dashboard' });
	this.resource('auth', function() {
		this.route('login', { path: '/login' });
		this.route('logout', { path: '/logout' });
		this.route('signup', { path: '/signup' });
	});
});


})();