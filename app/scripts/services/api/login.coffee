class Login extends Service
  constructor: (@$resource, @urlConfigService) ->
    console.log @urlConfigService

    login = @$resource(@urlConfigService.api + "/admin_user/", {},
      create:
        method: "POST"

      log:
        method: "POST"
        url: @urlConfigService.api + "/admin_user/login/"

      password:
        method: "POST"
        url: @urlConfigService.api + "/user/forgot_password/"
    )

    return {
      create: login.create
      log: login.log
      password: login.password
    }