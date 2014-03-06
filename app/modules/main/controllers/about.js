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