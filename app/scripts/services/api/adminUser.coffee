class AdminUser extends Service
  constructor: (@$resource, @$filter, @urlConfigService, @localStorageService) ->
    admin = @$resource(@urlConfigService.api + "/admin_user/:admin_user_id", {},
      query:
        method: "GET"
        params:
          admin_user_id: "@admin_user_id"

      create:
        method: "POST"

      update:
        method: "PUT"
        params:
          admin_user_id: "@admin_user"

      remove:
        method: "DELETE"
    )
    
    update = (id, user) ->
      _user = user
      @localStorageService.set 'user', JSON.stringify(user)
      admin.update.call this, id, user

    return {
      query: admin.query
      create: admin.create
      update: update
      remove: admin.remove

      getTimezoneOffset: =>
        _user = @localStorageService.get('user') if _user is ( null or undefined )
        (if "time_zone_offset" of _user then _user.time_zone_offset else -3.0)

      timeIntervalFirst: (ts) =>
        _user = @localStorageService.get('user') if _user is ( null or undefined )
        _user.time_interval_first = ts  if typeof ts is "number" and ts > 0
        (if "time_interval_first" of _user then _user.time_interval_first else 0)

      timeIntervalLast: (ts) =>
        _user = @localStorageService.get('user') if _user is ( null or undefined )
        _user.time_interval_last = ts  if typeof ts is "number" and ts > 0
        (if "time_interval_last" of _user then _user.time_interval_last else 0)

      timeInterval: =>
        _user = @localStorageService.get('user') if _user is ( null or undefined )
        (if ("time_interval_first" of _user) and ("time_interval_last" of _user) then _user.time_interval_last - _user.time_interval_first else 0)

      utcTsToUserTime: (ts, format) =>
        format = ((if format is `undefined` then "dd/MM/yyyy HH:mm" else String(format)))
        offset = @getTimezoneOffset() + new Date().getTimezoneOffset() / 60
        dms = offset * 3600000
        date = new Date(ts + dms)
        @$filter("date") date, format
    }