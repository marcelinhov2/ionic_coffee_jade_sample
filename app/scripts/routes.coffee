class Routes extends Config
  constructor: ($stateProvider, $urlRouterProvider) ->
    $stateProvider

      # setup an abstract state for the tabs directive
      .state 'tab',
        url: '/tab'
        abstract: true
        templateUrl: '/templates/tabs.html'

      # Each tab has its own nav history stack:
      .state 'tab.dash',
        url: '/dash'
        views:
          'tab-dash':
            templateUrl: '/templates/tab-dash.html',
            controller: 'dashController'

      .state 'tab.friends',
        url: '/friends'
        views:
          'tab-friends':
            templateUrl: '/templates/tab-friends.html',
            controller: 'friendsController'

      .state 'tab.friend-detail',
        url: '/friend/:friendId',
        views:
          'tab-friends':
            templateUrl: '/templates/friend-detail.html',
            controller: 'friendDetailController'

      .state 'tab.account',
        url: '/account',
        views:
          'tab-account':
            templateUrl: '/templates/tab-account.html',
            controller: 'accountController'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash')
