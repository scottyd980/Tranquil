Em.onLoad 'Ember.Application', (application) ->
  application.initializer
    name: 'ember-auth.module.auth-redirectable'
    before: 'ember-auth-load'

    initialize: (container, app) ->
      app.register 'authModule:authRedirectable', \
      Em.Auth.AuthRedirectableAuthModule, { singleton: true }
      app.inject 'authModule:authRedirectable', 'auth', 'auth:main'

  application.initializer
    name: 'ember-auth.module.auth-redirectable-load'
    after: 'ember-auth-load'

    initialize: (container, app) ->
      # force init() call wth an eager-load
      container.lookup 'authModule:authRedirectable'
