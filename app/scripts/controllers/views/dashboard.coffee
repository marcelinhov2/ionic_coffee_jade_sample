class Dashboard extends Controller
  constructor: (@$scope, @$filter, @$location, @adminUserService, @dashboardService, @localStorageService, @SEARCH_TIME, @urlConfigService) ->
    console.log 'Dashboard'