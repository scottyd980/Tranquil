describe 'Em.Auth.ActionRedirectableAuthModule', ->
  auth        = null
  spy         = null
  actionRedir = null

  beforeEach ->
    auth = authTest.create { modules: ['actionRedirectable'] }
    actionRedir = auth.module.actionRedirectable
  afterEach ->
    auth.destroy() if auth
    sinon.collection.restore()

  describe '#canonicalizeRoute', ->
    it 'strips .index from routes', ->
      expect(actionRedir.canonicalizeRoute('foo.index')).toEqual 'foo'

    it 'works for routes without .index', ->
      expect(actionRedir.canonicalizeRoute('foo')).toEqual 'foo'

    it 'catches non-string arguments and return empty string', ->
      expect(actionRedir.canonicalizeRoute(null)).toEqual ''

  example 'get blacklist', (env) ->
    beforeEach ->
      Em.run -> actionRedir.set "config.#{env}Blacklist", ['foo', 'bar']

    it "returns #{env} blacklist config", ->
      expect(actionRedir.getBlacklist(env)).toEqual ['foo', 'bar']

    it 'runs each route through #canonicalizeRoute', ->
      spy = sinon.collection.spy actionRedir, 'canonicalizeRoute'
      actionRedir.getBlacklist(env)
      expect(spy).toHaveBeenCalledWithExactly('foo')
      expect(spy).toHaveBeenCalledWithExactly('bar')

  describe '#getBlacklist', ->
    describe 'signIn',  -> follow 'get blacklist', 'signIn'
    describe 'signOut', -> follow 'get blacklist', 'signOut'

  example 'resolve redirect', (env) ->
    describe 'redirect turned off', ->
      beforeEach ->
        Em.run -> actionRedir.set "config.#{env}Route", false

      it 'returns null', ->
        expect(actionRedir.resolveRedirect(env)).toBeNull()

    describe 'redirect turned on', ->
      beforeEach ->
        Em.run -> actionRedir.set "config.#{env}Route", 'foo'

      describe 'smart turned off', ->
        beforeEach ->
          Em.run -> actionRedir.set "config.#{env}Smart", false

        it 'returns fallback route', ->
          expect(actionRedir.resolveRedirect(env)).toEqual 'foo'

      describe 'smart turned on', ->
        beforeEach ->
          Em.run -> actionRedir.set "config.#{env}Smart", true

        describe 'transition registered', ->
          beforeEach -> Em.run -> actionRedir.set "#{env}Redir", {a:1}

          it 'returns registered transition', ->
            expect(actionRedir.resolveRedirect(env)).toEqual {a:1}

        describe 'no transition registered', ->
          beforeEach -> Em.run -> actionRedir.set "#{env}Transition", null

          it 'returns fallback route', ->
            expect(actionRedir.resolveRedirect(env)).toEqual 'foo'

  describe '#resolveRedirect', ->
    describe 'signIn',  -> follow 'resolve redirect', 'signIn'
    describe 'signOut', -> follow 'resolve redirect', 'signOut'

    it 'returns null for unrecognized env', ->
        expect(actionRedir.resolveRedirect('foo')).toBeNull()

  describe '#registerRedirect', ->

    # a mock transition
    transition = (route) -> { targetName: route }

    it 'runs route through #canonicalizeRoute', ->
      spy = sinon.collection.spy actionRedir, 'canonicalizeRoute'
      actionRedir.registerRedirect transition 'foo'
      expect(spy).toHaveBeenCalledWithExactly 'foo'

    example 'redirect reg', (env) ->
      describe 'route in blacklist', ->
        it 'registers nothing', ->
          sinon.collection.stub actionRedir, 'getBlacklist', \
          (arg) -> ["#{arg}-foo"]
          Em.run -> actionRedir.registerRedirect transition "#{env}-foo"
          expect(actionRedir.get "#{env}Redir").toEqual null

      describe 'route not in blacklist', ->
        it 'registers route with args', ->
          sinon.collection.stub actionRedir, 'getBlacklist', -> []
          Em.run -> actionRedir.registerRedirect transition "#{env}-foo"
          expect(actionRedir.get "#{env}Redir").toEqual transition "#{env}-foo"

    follow 'redirect reg', 'signIn'
    follow 'redirect reg', 'signOut'

  describe '#redirect', ->

    describe 'sign in / sign out integration', ->
      beforeEach ->
        spy = sinon.collection.stub actionRedir, 'resolveRedirect', -> null

      describe 'on sign in', ->
        beforeEach -> Em.run -> auth._session.start()

        it 'delegates to #resolveRedirect', ->
          Em.run -> actionRedir.redirect()
          expect(spy).toHaveBeenCalledWithExactly 'signIn'

      describe 'on sign out', ->
        beforeEach ->
          Em.run ->
            auth._session.start() # need to sign in first to trigger change
            auth._session.end()

        it 'delegates to #resolveRedirect', ->
          Em.run -> actionRedir.redirect()
          expect(spy).toHaveBeenCalledWithExactly 'signOut'

    describe 'redirect integration', ->
      beforeEach ->
        appTest.create (app) ->
          app.Auth = authTest.extend
            container: app.__container__
            modules: ['actionRedirectable']
          app.Router.map ->
            @route 'foo', { path: '/foo/:foo_id' }
            @route 'bar'
          app.FooRoute = Em.Route.extend
            model: (params) -> app.Foo.find(params.foo_id)
          app.BarRoute = Em.Route.extend()
          app.Foo = { find: (arg) -> Em.Object.create { _id: arg } }
        appTest.run (app) ->
          auth = appTest.lookup 'auth:main'
          actionRedir = auth.module.actionRedirectable
          actionRedir.router = appTest.lookup 'router:main'
      afterEach ->
        appTest.destroy()

      it 'supports redirect by transition', ->
        # grab an instance of a real transition
        barTransition = null
        appTest.run (app) ->
          app.BarRoute.reopen
            beforeModel: (transition) ->
              barTransition = transition
              super.apply this, arguments
        appTest.ready()
        appTest.toRoute 'bar'
        expect(barTransition).not.toBeNull() # now barTransition is populated

        appTest.toRoute 'foo'
        expect(appTest.currentPath()).toEqual 'foo' # redirect away

        # real test begins
        sinon.collection.stub actionRedir, 'resolveRedirect', -> barTransition
        Em.run -> actionRedir.redirect()
        expect(appTest.currentPath()).toEqual 'bar'

      it 'supports redirect by path', ->
        sinon.collection.stub actionRedir, 'resolveRedirect', -> 'foo'
        appTest.ready()
        Em.run -> actionRedir.redirect()
        expect(appTest.currentPath()).toEqual 'foo'

  describe 'patch', ->
    beforeEach ->
      appTest.create (app) ->
        app.Router.map -> @route 'foo'
        app.FooRoute = Em.Route.extend()
        app.Auth = authTest.extend
          container: app.__container__
          modules: ['actionRedirectable']
      appTest.run (app) ->
        auth = appTest.lookup 'auth:main'
        actionRedir = auth.module.actionRedirectable
    afterEach ->
      appTest.destroy()

    it 'registers redirect', ->
      spy = sinon.collection.spy actionRedir, 'registerRedirect'
      appTest.ready()
      appTest.toRoute 'foo'
      expect(spy).toHaveBeenCalled()
