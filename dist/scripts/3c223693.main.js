!function(){window.Tranquil=Ember.Application.create({LOG_TRANSITIONS:!0,LOG_BINDINGS:!0,LOG_VIEW_LOOKUPS:!0,LOG_STACKTRACE_ON_DEPRECATION:!0,LOG_VERSION:!0,debugMode:!0}),Tranquil.Auth=Em.Auth.extend({request:"jquery",response:"json",strategy:"token",signInEndPoint:"/api/auth/login",signOutEndPoint:"/api/auth/logout",tokenKey:"auth_token",tokenLocation:"param",tokenIdKey:"user_id",session:"cookie",modules:["actionRedirectable","authRedirectable","rememberable"],rememberable:{tokenKey:"remember_token",period:"14",autoRecall:!0},authRedirectable:{route:"auth.login"},actionRedirectable:{signInRoute:"about",signOutRoute:"index"}}),Tranquil.AuthenticatedRoute=Ember.Route.extend({authRedirectable:!0,beforeModel:function(){this._super.apply(this,arguments)}})}(),function(){Tranquil.TodoItemComponent=Ember.Component.extend({item:null,keyDown:function(a){if(13===a.which){a.preventDefault();var b=this.get("item"),c=this.$(".todo-editable");b.set("name",c.text()),b.save(),c.prop("contenteditable",!1).blur()}},actions:{edit:function(){this.$(".todo-editable").prop("contenteditable",!0).focus()},"delete":function(){var a=this.get("item");a.deleteRecord()}}})}(),function(){Tranquil.ApplicationAdapter=DS.FixtureAdapter.extend()}(),function(){Tranquil.Site=DS.Model.extend({title:DS.attr("string"),link:DS.attr("string")}),Tranquil.Site.FIXTURES=[{id:1,title:"About",link:"about"},{id:2,title:"Contact",link:"contact"},{id:3,title:"Todos",link:"todos"}]}(),function(){Tranquil.Todo=DS.Model.extend({name:DS.attr("string"),isDone:DS.attr("boolean")}),Tranquil.Todo.FIXTURES=[{id:"a",name:"Walk the dog",isDone:!1},{id:"b",name:"Buy groceries",isDone:!1}]}(),function(){Tranquil.AuthLoginRoute=Ember.Route.extend({})}(),function(){Tranquil.AuthSignupRoute=Ember.Route.extend({setupController:function(a){a.reset()}})}(),function(){Tranquil.AboutRoute=Tranquil.AuthenticatedRoute.extend({})}(),function(){Tranquil.ApplicationRoute=Ember.Route.extend({})}(),function(){Tranquil.TodosRoute=Ember.Route.extend({model:function(){return this.store.find("todo")}})}(),function(){Tranquil.AuthLoginController=Ember.Controller.extend({username:null,password:null,remember:!0,actions:{signIn:function(){this.auth.signIn({data:{username:this.get("username"),password:this.get("password"),remember:this.get("remember")}}).then(function(){}).fail(function(){})}}})}(),function(){Tranquil.AuthSignupController=Ember.Controller.extend({reset:function(){this.setProperties({fullname:"",email:"",username:"",password:""}),this.resetErrors()},resetErrors:function(){this.setProperties({errorMessage:"",fullnameError:"",emailError:"",passwordError:"",usernameError:""})},actions:{signup:function(){var a=this.getProperties("fullname","email","username","password");$.post("/api/auth/signup",{user:a},function(a){!a.success})}}})}(),function(){Tranquil.AboutController=Ember.Controller.extend({someText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque libero massa, mollis.",actions:{signIn:function(){this.auth.signIn({data:{email:"scott@scottyd.net",password:"test"}})}}})}(),function(){Tranquil.ApplicationController=Ember.ArrayController.extend({})}(),function(){Tranquil.TodosIndexController=Ember.Controller.extend({needs:["todos"],actions:{newTodo:function(){var a=this.store.createRecord("todo",{name:"Get r done"});a.save()},clearDone:function(){for(var a=this.get("controllers.todos"),b=a.filter(function(a){return a.get("isDone")});b.length>0;){var c=b.pop();c.deleteRecord(),c.save()}}}})}(),function(){Tranquil.TodosController=Ember.ArrayController.extend({})}(),function(){Tranquil.IndexView=Ember.View.extend({})}(),function(){Ember.Handlebars.registerBoundHelper("wordCount",function(a){var b;return"string"==typeof a&&a.length?(b=a.trim().match(/\s+/g).length)>0?b+1:1:"0"})}(),function(){Tranquil.Router.map(function(){this.route("about",{path:"/about"}),this.route("pricing",{path:"/pricing"}),this.route("dashboard",{path:"/dashboard"}),this.resource("auth",function(){this.route("login",{path:"/login"}),this.route("logout",{path:"/logout"}),this.route("signup",{path:"/signup"})})})}(),Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){b.buffer.push('<img src="../assets/img/logo2.png"/> Tranquility')}function g(a,b){b.buffer.push("About")}function h(a,b){b.buffer.push("Pricing")}function i(a,b){b.buffer.push("Sign Up")}function j(a,b){b.buffer.push("Login")}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var k,l,m,n,o,p="",q=this,r=c.helperMissing,s=this.escapeExpression;return e.buffer.push('<div class="wrapper">\n  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="container">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        '),m={"class":b},n={"class":"STRING"},o={hash:{"class":"navbar-brand"},inverse:q.noop,fn:q.program(1,f,e),contexts:[b],types:["STRING"],hashContexts:m,hashTypes:n,data:e},k=c["link-to"]||b["link-to"],l=k?k.call(b,"index",o):r.call(b,"link-to","index",o),(l||0===l)&&e.buffer.push(l),e.buffer.push('\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n      <div class="collapse navbar-collapse navbar-ex1-collapse">\n        <ul class="nav navbar-nav">\n          <li>'),n={},m={},o={hash:{},inverse:q.noop,fn:q.program(3,g,e),contexts:[b],types:["STRING"],hashContexts:m,hashTypes:n,data:e},k=c["link-to"]||b["link-to"],l=k?k.call(b,"about",o):r.call(b,"link-to","about",o),(l||0===l)&&e.buffer.push(l),e.buffer.push('</li>\n        </ul>\n        <ul class="nav navbar-nav navbar-right">\n          <li>'),n={},m={},o={hash:{},inverse:q.noop,fn:q.program(5,h,e),contexts:[b],types:["STRING"],hashContexts:m,hashTypes:n,data:e},k=c["link-to"]||b["link-to"],l=k?k.call(b,"pricing",o):r.call(b,"link-to","pricing",o),(l||0===l)&&e.buffer.push(l),e.buffer.push("</li>\n          <li>"),n={},m={},o={hash:{},inverse:q.noop,fn:q.program(7,i,e),contexts:[b],types:["STRING"],hashContexts:m,hashTypes:n,data:e},k=c["link-to"]||b["link-to"],l=k?k.call(b,"auth.signup",o):r.call(b,"link-to","auth.signup",o),(l||0===l)&&e.buffer.push(l),e.buffer.push("</li>\n          <li>"),n={},m={},o={hash:{},inverse:q.noop,fn:q.program(9,j,e),contexts:[b],types:["STRING"],hashContexts:m,hashTypes:n,data:e},k=c["link-to"]||b["link-to"],l=k?k.call(b,"auth.login",o):r.call(b,"link-to","auth.login",o),(l||0===l)&&e.buffer.push(l),e.buffer.push("</li>\n        </ul>\n      </div><!-- /.navbar-collapse -->\n    </div>\n  </nav>\n\n  "),n={},m={},e.buffer.push(s(c._triageMustache.call(b,"outlet",{hash:{},contexts:[b],types:["ID"],hashContexts:m,hashTypes:n,data:e}))),e.buffer.push('\n\n  <div class="push"></div>\n  </div>\n  <footer>\n    <div class="align-center">&copy; 2013 Tranquility</div>\n  </footer>\n</div>\n'),p}),Ember.TEMPLATES["components/todo-item"]=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=this.escapeExpression,l=c.helperMissing;return e.buffer.push('<div class="todo-item" '),g={"class":b},h={"class":"STRING"},e.buffer.push(k(c.bindAttr.call(b,{hash:{"class":"item.isDone:done"},contexts:[],types:[],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push(">\n  "),g={"class":b,type:b,checked:b},h={"class":"STRING",type:"STRING",checked:"ID"},i={hash:{"class":"todo-checkbox",type:"checkbox",checked:"item.isDone"},contexts:[],types:[],hashContexts:g,hashTypes:h,data:e},e.buffer.push(k((f=c.input||b.input,f?f.call(b,i):l.call(b,"input",i)))),e.buffer.push('\n  <span class="todo-editable" '),h={},g={},e.buffer.push(k(c.action.call(b,"edit",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push(">"),h={},g={},e.buffer.push(k(c._triageMustache.call(b,"item.name",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push('</span>\n  <a href="#" class="todo-delete" '),h={},g={},e.buffer.push(k(c.action.call(b,"delete",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push(' title="Delete todo">&times;</a>\n</div>\n'),j}),Ember.TEMPLATES["auth/login"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push('\n					<div class="alert alert-danger">'),d={},e={},b.buffer.push(l(c._triageMustache.call(a,"errorMessage",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</div>\n				"),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j,k="",l=this.escapeExpression,m=this,n=c.helperMissing;return e.buffer.push('<section class="section">\n	<div class="container">\n	  <div class="row">\n	    <div class="col-lg-12">\n			<h3 class="page-title">Login <small>Enter your credentials to securely access your account</small></h3>\n			<div class="page-body">\n				'),h={},i={},g=c["if"].call(b,"errorMessage",{hash:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}),(g||0===g)&&e.buffer.push(g),e.buffer.push("\n				<form "),i={on:b},h={on:"STRING"},e.buffer.push(l(c.action.call(b,"signIn",{hash:{on:"submit"},contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}))),e.buffer.push(' role="form">\n					<div class="form-group">\n						<label for="username">Username</label>\n						'),i={value:b,type:b,id:b,"class":b},h={value:"ID",type:"STRING",id:"STRING","class":"STRING"},j={hash:{value:"username",type:"text",id:"username","class":"form-control"},contexts:[],types:[],hashContexts:i,hashTypes:h,data:e},e.buffer.push(l((g=c.input||b.input,g?g.call(b,j):n.call(b,"input",j)))),e.buffer.push('\n					</div>\n					<div class="form-group">\n						<label for="password">Password</label>\n						'),i={value:b,type:b,id:b,"class":b},h={value:"ID",type:"STRING",id:"STRING","class":"STRING"},j={hash:{value:"password",type:"password",id:"password","class":"form-control"},contexts:[],types:[],hashContexts:i,hashTypes:h,data:e},e.buffer.push(l((g=c.input||b.input,g?g.call(b,j):n.call(b,"input",j)))),e.buffer.push('\n					</div>\n					<div class="checkbox">\n						<label>\n							'),i={checkedBinding:b},h={checkedBinding:"STRING"},e.buffer.push(l(c.view.call(b,"Ember.Checkbox",{hash:{checkedBinding:"remember"},contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}))),e.buffer.push(" Remember me\n						</label>\n					</div>\n\n					"),i={"class":b,type:b,value:b},h={"class":"STRING",type:"STRING",value:"STRING"},j={hash:{"class":"btn btn-primary",type:"submit",value:"Login"},contexts:[],types:[],hashContexts:i,hashTypes:h,data:e},e.buffer.push(l((g=c.input||b.input,g?g.call(b,j):n.call(b,"input",j)))),e.buffer.push("\n				</form>\n			</div>\n\n	    </div>\n	  </div>\n	</div>\n</section>"),k}),Ember.TEMPLATES["auth/signup"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push('\n						<div class="alert alert-danger">'),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"errorMessage",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</div>\n					"),f}function g(a,b){var d,e,f="";return b.buffer.push('<span class="help-block">'),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"fullnameError",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</span>"),f}function h(a,b){var d,e,f="";return b.buffer.push('<span class="help-block">'),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"emailError",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</span>"),f}function i(a,b){var d,e,f="";return b.buffer.push('<span class="help-block">'),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"usernameError",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</span>"),f}function j(a,b){var d,e,f="";return b.buffer.push('<span class="help-block">'),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"passwordError",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</span>"),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var k,l,m,n,o,p="",q=this.escapeExpression,r=this,s=c.helperMissing;return e.buffer.push('<section class="section">\n	<div class="container">\n	  <div class="row">\n	    <div class="col-lg-12">\n			<h3 class="page-title">Sign Up <small>Create a new account to start tracking issues</small></h3>\n				<div class="page-body">\n					'),m={},n={},k=c["if"].call(b,"errorMessage",{hash:{},inverse:r.noop,fn:r.program(1,f,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n					<form "),n={on:b},m={on:"STRING"},e.buffer.push(q(c.action.call(b,"signup",{hash:{on:"submit"},contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}))),e.buffer.push(' role="form">\n						<div '),n={"class":b},m={"class":"STRING"},o={hash:{"class":":form-group fullnameError:has-error"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c["bind-attr"]||b["bind-attr"],k?k.call(b,o):s.call(b,"bind-attr",o)))),e.buffer.push('>\n							<label for="fullname">Full Name '),m={},n={},l=c["if"].call(b,"fullnameError",{hash:{},inverse:r.noop,fn:r.program(3,g,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}),(l||0===l)&&e.buffer.push(l),e.buffer.push("</label>\n							"),n={value:b,type:b,id:b,"class":b},m={value:"ID",type:"STRING",id:"STRING","class":"STRING"},o={hash:{value:"fullname",type:"text",id:"fullname","class":"form-control"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c.input||b.input,k?k.call(b,o):s.call(b,"input",o)))),e.buffer.push("\n						</div>\n						<div "),n={"class":b},m={"class":"STRING"},o={hash:{"class":":form-group emailError:has-error"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c["bind-attr"]||b["bind-attr"],k?k.call(b,o):s.call(b,"bind-attr",o)))),e.buffer.push('>\n							<label for="email">Email Address '),m={},n={},l=c["if"].call(b,"emailError",{hash:{},inverse:r.noop,fn:r.program(5,h,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}),(l||0===l)&&e.buffer.push(l),e.buffer.push("</label>\n							"),n={value:b,type:b,id:b,"class":b},m={value:"ID",type:"STRING",id:"STRING","class":"STRING"},o={hash:{value:"email",type:"text",id:"email","class":"form-control"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c.input||b.input,k?k.call(b,o):s.call(b,"input",o)))),e.buffer.push("\n						</div>\n						<div "),n={"class":b},m={"class":"STRING"},o={hash:{"class":":form-group usernameError:has-error"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c["bind-attr"]||b["bind-attr"],k?k.call(b,o):s.call(b,"bind-attr",o)))),e.buffer.push('>\n							<label for="username">Username '),m={},n={},l=c["if"].call(b,"usernameError",{hash:{},inverse:r.noop,fn:r.program(7,i,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}),(l||0===l)&&e.buffer.push(l),e.buffer.push("</label>\n							"),n={value:b,type:b,id:b,"class":b},m={value:"ID",type:"STRING",id:"STRING","class":"STRING"},o={hash:{value:"username",type:"text",id:"username","class":"form-control"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c.input||b.input,k?k.call(b,o):s.call(b,"input",o)))),e.buffer.push("\n						</div>\n						<div "),n={"class":b},m={"class":"STRING"},o={hash:{"class":":form-group passwordError:has-error"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c["bind-attr"]||b["bind-attr"],k?k.call(b,o):s.call(b,"bind-attr",o)))),e.buffer.push('>\n							<label for="password">Password '),m={},n={},l=c["if"].call(b,"passwordError",{hash:{},inverse:r.noop,fn:r.program(9,j,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}),(l||0===l)&&e.buffer.push(l),e.buffer.push("</label>\n							"),n={value:b,type:b,id:b,"class":b},m={value:"ID",type:"STRING",id:"STRING","class":"STRING"},o={hash:{value:"password",type:"password",id:"password","class":"form-control"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c.input||b.input,k?k.call(b,o):s.call(b,"input",o)))),e.buffer.push("\n						</div>\n						"),n={"class":b,type:b,value:b},m={"class":"STRING",type:"STRING",value:"STRING"},o={hash:{"class":"btn btn-primary",type:"submit",value:"Sign Up"},contexts:[],types:[],hashContexts:n,hashTypes:m,data:e},e.buffer.push(q((k=c.input||b.input,k?k.call(b,o):s.call(b,"input",o)))),e.buffer.push("\n					</form>\n				</div>\n	    </div>\n	  </div>\n	</div>\n</section>"),p}),Ember.TEMPLATES._link=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push('<a href="#">'),d={},e={},b.buffer.push(m(c._triageMustache.call(a,"title",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</a>"),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j,k,l="",m=this.escapeExpression,n=this,o=c.helperMissing;return e.buffer.push("\n"),i={tagName:b},j={tagName:"STRING"},k={hash:{tagName:"li"},inverse:n.noop,fn:n.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e},g=c["link-to"]||b["link-to"],h=g?g.call(b,"link",k):o.call(b,"link-to","link",k),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n"),l}),Ember.TEMPLATES.about=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=this.escapeExpression,l=c.helperMissing;return e.buffer.push("<h3>Hello World!</h3>\n<p>"),g={},h={},e.buffer.push(k(c._triageMustache.call(b,"someText",{hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push("</p>\n<p>Word Count: "),g={},h={},i={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e},e.buffer.push(k((f=c.wordCount||b.wordCount,f?f.call(b,"someText",i):l.call(b,"wordCount","someText",i)))),e.buffer.push("</p>\n<a "),g={},h={},e.buffer.push(k(c.action.call(b,"signIn",{hash:{},contexts:[b],types:["STRING"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push(">Sign In</a>\n"),g={},h={},e.buffer.push(k(c._triageMustache.call(b,"auth.authToken",{hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push("\n\n"),g={},h={},e.buffer.push(k(c._triageMustache.call(b,"auth.signedIn",{hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e}))),j}),Ember.TEMPLATES.contact=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{},e.buffer.push("<h3>Contact Me!</h3>\n")}),Ember.TEMPLATES.index=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{},e.buffer.push("<h3>Index Template</h3>\n")}),Ember.TEMPLATES["todos/index"]=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push('<p>\n  <a href="#" '),f={},g={},e.buffer.push(i(c.action.call(b,"newTodo",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('>+ Todo</a> | <a href="#" '),f={},g={},e.buffer.push(i(c.action.call(b,"clearDone",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push(">Clear Done</a>\n</p>\n"),h}),Ember.TEMPLATES.todos=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n  "),e={item:a},f={item:"ID"},g={hash:{item:"todo"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(l((d=c["todo-item"]||a["todo-item"],d?d.call(a,g):k.call(a,"todo-item",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j="",k=c.helperMissing,l=this.escapeExpression,m=this;return h={},i={},g=c.each.call(b,"todo","in","controller",{hash:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[b,b,b],types:["ID","ID","ID"],hashContexts:i,hashTypes:h,data:e}),(g||0===g)&&e.buffer.push(g),e.buffer.push("\n\n"),h={},i={},e.buffer.push(l(c._triageMustache.call(b,"outlet",{hash:{},contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}))),e.buffer.push("\n"),j});