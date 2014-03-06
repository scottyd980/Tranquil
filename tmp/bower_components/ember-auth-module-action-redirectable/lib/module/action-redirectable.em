class Em.Auth.ActionRedirectableAuthModule
  init: ->
    @auth._config 'actionRedirectable', @_defaultConfig
    @config? || (@config = @auth._config 'actionRedirectable')

    @auth.addHandler 'signInSuccess',  @redirect.bind(@)
    @auth.addHandler 'signOutSuccess', @redirect.bind(@)

  _defaultConfig:
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

  # @property [Transition|null] a transition representing last app route state,
  #   given that the last route state is not blacklisted for sign in redirect;
  #   null otherwise
  signInRedir:  null

  # @property [Transition|null] a transition representing last app route state,
  #   given that the last route state is not blacklisted for sign out redirect;
  #   null otherwise
  signOutRedir: null

  # register a transition for redirect upon sign in / out
  #
  # @param transition [Transition] the transition to redirect to
  registerRedirect: (transition) ->
    routeName = @canonicalizeRoute transition.targetName
    unless routeName in @getBlacklist('signIn')
      @signInRedir  = transition
    unless routeName in @getBlacklist('signOut')
      @signOutRedir = transition

  # normalize 'foo.index' routes to 'foo' for comparison
  #
  # @param route [string] the route name
  #
  # @return [string] the route name, with any trailing '.index' stripped
  canonicalizeRoute: (route) ->
    return '' unless typeof route == 'string'

    endsWith = (haystack, needle) ->
      d = haystack.length - needle.length
      d >= 0 && haystack.lastIndexOf(needle) == d

    return route unless endsWith(route, '.index')
    route.substr(0, route.lastIndexOf('.index'))

  # get the sign in / out route blacklist, each route being canonicalized
  #
  # @param env [string] either 'signIn' or 'signOut'
  #
  # @return [array<string>] array of routes, each route being canonicalized
  getBlacklist: (env) ->
    return [] unless blacklist = @config["#{env}Blacklist"]
    @canonicalizeRoute route for route in blacklist

  # resolve the redirect destination for sign in / out
  #
  # @param env [string] either 'signIn' or 'signOut'
  #
  # @return [Transition|string|null]
  #   a Transition, or a string being the route name, or null (no redirect)
  resolveRedirect: (env) ->
    return null unless env in ['signIn', 'signOut'] # unknown arg

    isSmart  = @config["#{env}Smart"]
    fallback = @canonicalizeRoute @config["#{env}Route"]

    # redirect turned off
    return null     unless fallback
    # smart mode turned off, use static redirect
    return fallback unless isSmart
    # use fallback if there is no valid (non-blacklist) redir reg-ed
    return @get("#{env}Redir") || fallback

  # perform a post- sign in / out redirect
  #
  # works with the polymorphic redirect destinations from resolveRedirect(),
  # including 'no redirect'
  redirect: ->
    env = if @auth.signedIn then 'signIn' else 'signOut'
    return unless result = @resolveRedirect env
    switch typeof result
      when 'object' then result.retry()              # object = a Transition
      when 'string' then @router.transitionTo result # string = a route name
