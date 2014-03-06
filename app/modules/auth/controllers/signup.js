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
