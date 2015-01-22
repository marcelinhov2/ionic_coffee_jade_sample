class App extends Controller
  constructor: (@$scope, @$ionicSideMenuDelegate) ->
    do @defineTemplateMethods

  defineTemplateMethods: =>
    @$scope.toggleRight = @toggleRight

  toggleRight: =>
    do @$ionicSideMenuDelegate.toggleRight