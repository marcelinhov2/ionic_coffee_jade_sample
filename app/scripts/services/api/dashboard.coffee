class Dashboard extends Service
  constructor: (@$resource, @urlConfigService) ->
    dashboard = @$resource(@urlConfigService.api + "/dashboard/", {},
      get_all_stats:
        method: "GET"
        url: @urlConfigService.api + "/dashboard/all_stats/:start_date/:end_date/"
    )

    return {
      get_all_stats: dashboard.get_all_stats
    }