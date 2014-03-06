# auth redirectable module for ember-auth

[![Build Status](https://secure.travis-ci.org/heartsentwined/ember-auth-module-auth-redirectable.png)](http://travis-ci.org/heartsentwined/ember-auth-module-auth-redirectable)
[![Gem Version](https://badge.fury.io/rb/ember-auth-module-auth_redirectable-source.png)](http://badge.fury.io/rb/ember-auth-module-auth_redirectable-source)
[![NPM version](https://badge.fury.io/js/ember-auth-module-auth-redirectable.png)](http://badge.fury.io/js/ember-auth-module-auth-redirectable)

Redirect for protected routes without a signed in session.

## Config

```coffeescript
App.Auth = Em.Auth.extend
  modules: ['authRedirectable']

  authRedirectable:
    # [string] route name to redirect to when accessing a protected route
    #   without a signed in session
    route: null
```

## Usage

```coffeescript
# this route won't redirect
App.PublicRoute = Em.Route.extend()

# this route will redirect (unless signed in)
App.ProtectedRoute = Em.Route.extend({ authRedirectable: true })
```

```coffeescript
# call _super() and follow the promise pattern
# if you override Ember.Route.beforeModel()
App.FooRoute = Ember.Route.extend
  beforeModel: ->
    @_super.apply(this, arguments).then -> doSomething()
  # or
  beforeModel: ->
    doSomething()
    @_super.apply(this, arguments) # already returns promise
```

License
=======

MIT
