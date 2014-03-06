# action redirectable module for ember-auth

[![Build Status](https://secure.travis-ci.org/heartsentwined/ember-auth-module-action-redirectable.png)](http://travis-ci.org/heartsentwined/ember-auth-module-action-redirectable)
[![Gem Version](https://badge.fury.io/rb/ember-auth-module-action_redirectable-source.png)](http://badge.fury.io/rb/ember-auth-module-action_redirectable-source)
[![NPM version](https://badge.fury.io/js/ember-auth-module-action-redirectable.png)](http://badge.fury.io/js/ember-auth-module-action-redirectable)

Redirects for post- sign in / out.

## Config

```coffeescript
App.Auth = Em.Auth.extend
  modules: ['actionRedirectable']

  actionRedirectable:
    # [string|false] (opt) fallback route name to redirect post- sign in
    #   or false to disable post- sign in redirect
    signInRoute: false

    # same
    signOutRoute: false

    # [bool] (opt) true to turn on "smart" redirect:
    #   redirect to last visited route (if any), (else back to fallback route)
    signInSmart: false

    # same
    signOutSmart: false

    # [array<string>] (opt) only used for "smart" redirect: list of route names
    #   that should be skipped when determining last visited route
    signInBlacklist: []

    # same
    signOutBlacklist: []
```
