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
				//$.cookie('remember_token', response.auth_token, {expires: 365});
			}).catch(function(response) {
				//console.log(response);
			});
			
		}
	}
});