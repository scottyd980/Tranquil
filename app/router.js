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
