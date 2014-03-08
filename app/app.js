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
	},
	actionRedirectable: {
		signInRoute: 'about',
		signOutRoute: 'index'
	}
});

Tranquil.AuthenticatedRoute = Ember.Route.extend({
	authRedirectable: true,
	beforeModel: function () {
        this._super.apply(this, arguments);
    }
});

// Load mixins and components before anything else
require('mixins/*');
require('components/*');

require('store');
require('modules/*/models/*');
require('modules/*/routes/*');
require('modules/*/controllers/*');
require('modules/*/views/*');
require('helpers/*');
require('router');
