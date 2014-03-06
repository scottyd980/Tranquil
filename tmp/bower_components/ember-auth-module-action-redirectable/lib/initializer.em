Em.onLoad 'Ember.Application', (application) ->
  application.initializer
    name: 'ember-auth.module.action-redirectable'
    before: 'ember-auth-load'

    initialize: (container, app) ->
      app.register 'authModule:actionRedirectable', \
      Em.Auth.ActionRedirectableAuthModule, { singleton: true }
      app.inject 'authModule:actionRedirectable', 'auth', 'auth:main'
      app.inject 'authModule:actionRedirectable', 'router', 'router:main'

      Em.Route.reopen
        beforeModel: (queryParams, transition) ->
          transition = queryParams unless transition?
          @auth.module.actionRedirectable.registerRedirect transition
          super.apply this, arguments

  application.initializer
    name: 'ember-auth.module.action-redirectable-load'
    after: 'ember-auth-load'

    initialize: (container, app) ->
      # force init() call wth an eager-load
      container.lookup 'authModule:actionRedirectable'
