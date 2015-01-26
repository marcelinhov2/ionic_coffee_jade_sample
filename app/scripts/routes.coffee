class Routes extends Config
  constructor: ($stateProvider, $urlRouterProvider, $httpProvider) ->
    $stateProvider

      .state 'login',
        url: '/login'
        templateUrl: '/templates/views/login.html'
        controller: 'loginController'

      # setup an abstract state for the tabs directive
      .state 'sectionmenu',
        url: '/section'
        abstract: true
        templateUrl: '/templates/directives/side-menu.html'

      .state 'sectionmenu.dashboard',
        url: '/dashboard'
        views:
          menuContent:
            templateUrl: '/templates/views/dashboard.html'
            controller: 'dashboardController'

      .state 'sectionmenu.transactions',
        url: '/transactions'
        views:
          menuContent:
            templateUrl: '/templates/views/transactions.html'
            controller: 'transactionsController'

      .state 'sectionmenu.transactionDetail',
        url: '/transactionDetail'
        views:
          menuContent:
            templateUrl: '/templates/views/transactionDetail.html'
            controller: 'transactionDetailController'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login')
    $httpProvider.interceptors.push 'HttpRequestInterceptor'