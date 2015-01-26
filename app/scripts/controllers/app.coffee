class App extends Controller
  constructor: (@$scope, @$rootScope, @$timeout, @$location, @$ionicSideMenuDelegate, @$ionicPlatform, @$cordovaSplashscreen, @localStorageService) ->
    do @defineTemplateMethods
    do @init

  defineTemplateMethods: =>
    @$scope.toggleRight = @toggleRight

  init: ->
    @$rootScope.$on "$locationChangeStart", (next, current) =>
      do @hasUser

    @$ionicPlatform.ready =>
      do @$cordovaSplashscreen.hide

  hasUser: ->
    if !@localStorageService.get 'user'
      @$location.path "/login"

  toggleRight: =>
    do @$ionicSideMenuDelegate.toggleRight