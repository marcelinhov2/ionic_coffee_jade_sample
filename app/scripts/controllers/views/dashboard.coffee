class Dashboard extends Controller
  constructor: (@$scope, @$filter, @$location, @adminUserService, @dashboardService, @localStorageService, @SEARCH_TIME, @urlConfigService) ->
    do @declare_scope_vars
    do @set_listeners

    do @define_template_methods

  declare_scope_vars: =>
    @$scope.config = {}

    @$scope.searchTime = @SEARCH_TIME
    @$scope.config.searchTime = @localStorageService.get("searchTime") or 0
    
  set_listeners: =>
    _self = @

    @$scope.$watch "config.searchTime", (now, then_, scope) =>
      if now is 0
        ts = Date.now()
        iv = @adminUserService.timeInterval()
        if iv is 0
          iv = 30 * 24 * 60 * 60 * 1000
          @adminUserService.timeIntervalFirst ts - iv
          @adminUserService.timeIntervalLast ts
        scope.config.searchTime = Math.round(iv / (24 * 60 * 60 * 1000))

      ts = Date.now()
      iv = (now - 1) * 24 * 60 * 60 * 1000
      first = @$filter("date")(ts - iv, "yyyy-MM-dd")
      last = @$filter("date")(ts, "yyyy-MM-dd")
      @adminUserService.timeIntervalFirst ts - now * 24 * 60 * 60 * 1000
      @adminUserService.timeIntervalLast ts
      @get_all_stats first, last

  define_template_methods: =>

  get_all_stats: (start_date, end_date) ->
    @localStorageService.set "searchTime", @$scope.config.searchTime
    
    stats = @dashboardService.get_all_stats(
      start_date: start_date
      end_date: end_date
    )

    stats.$promise.then @parseModel, (why) ->
      console.warn why

  parseModel: (model) =>
    @$scope.data = model.content