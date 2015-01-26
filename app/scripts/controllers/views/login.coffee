class Login extends Controller
  constructor: (@$scope, @$rootScope, @$location, @loginService, @parseBoolService, @localStorageService) ->
    do @declare_scope_vars
    if @$location.$$path is "/logout" then do @logout

    do @set_listeners
    do @define_template_methods

    do @setEmail

  set_listeners: ->
    @$scope.$watch "isLogin", @setIsLogin

  declare_scope_vars: =>
    @$scope.login = {}
    @$scope.forgot = {}
    @$scope.isLogin = @parseBoolService.convert(@localStorageService.get("isLogin"))

  define_template_methods: =>
    @$scope.submit = @submit
    @$scope.forgotPassword = @forgotPassword
    @$scope.closePasswordOverlay = @closePasswordOverlay
    @$scope.closePwSuccessOverlay = @closePwSuccessOverlay
    @$scope.requestPassword = @requestPassword

  handleLoginError: (data) ->
    @$scope.messages = (if (data and data.messages) then data.messages else [ text: "connection error" ])

  setIsLogin: =>
    @localStorageService.set "isLogin", @$scope.isLogin
  
  setEmail: =>
    @$scope.login.email = @localStorageService.get("lastEmail") or ""
    @$scope.saveEmail = true if @$scope.login.email
  
  saveEmail: =>
    @localStorageService.set "lastEmail", @localStorageService.get("user").email
  
  deleteEmail: =>
    @localStorageService.remove "lastEmail"
  
  logout: =>
    do @setEmail
    @localStorageService.remove "user"
    @$rootScope.$broadcast "logout", [ 1, 2, 3 ]
  
  submit: =>
    # loginOrCreate = (if (@$scope.isLogin) then @loginService.log else @loginService.create)
    @loginService.log(@$scope.login).$promise.then (data) =>
      if data.status is "OK"
        console.log data

        @localStorageService.set "user", JSON.stringify(data.content)

        url = @localStorageService.get("firstUrl") or "/dashboard"
        
        @localStorageService.remove "firstUrl"
        
        if @$scope.saveEmail
          @saveEmail()
        else
          @deleteEmail()
      else
        @handleLoginError data

  requestPassword: =>
    @loginService.password(@$scope.forgot).$promise.then (data) =>
      @$scope.passwordOverlay = false
      @$scope.pwSuccessOverlay = true
      @$scope.forgot.password_forgotten_email = ""
