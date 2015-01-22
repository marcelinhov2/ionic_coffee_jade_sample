class Routes extends Config
  constructor: ($stateProvider, $urlRouterProvider) ->
    $stateProvider

      # setup an abstract state for the tabs directive
      .state 'sectionmenu',
        url: '/section'
        abstract: true
        templateUrl: '/templates/directives/side-menu.html'

      .state 'sectionmenu.home',
        url: '/home'
        views:
          menuContent:
            templateUrl: '/templates/views/home.html'
            controller: 'homeController'

      .state 'sectionmenu.test',
        url: '/test'
        views:
          menuContent:
            templateUrl: '/templates/views/test.html'
            controller: 'testController'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/section/home')
