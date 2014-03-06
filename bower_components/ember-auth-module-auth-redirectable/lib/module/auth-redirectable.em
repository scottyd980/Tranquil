class Em.Auth.AuthRedirectableAuthModule
  init: ->
    @auth._config 'authRedirectable', @_defaultConfig
    @config? || (@config = @auth._config 'authRedirectable')

    # register an authAccess handler type
    @auth._handlers.authAccess = []

    @patch()

  _defaultConfig:
    # [string] route name to redirect to when accessing a protected route
    #   without a signed in session
    route: null

  patch: ->
    self = this
    Em.Route.reopen
      beforeModel: (queryParams, transition) ->
        self.auth._ensurePromise(super.apply this, arguments).then =>
          return if self.auth.signedIn || !@authRedirectable

          transition = queryParams unless transition?

          promises = []
          for handler in self.auth._handlers.authAccess
            promises.push handler(transition)

          Em.RSVP.all(promises).then => @transitionTo self.config.route
