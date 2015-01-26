class HttpRequestInterceptor extends Factory
  constructor: (@$q, @$location, @$rootScope, @localStorageService) ->
    @queue = []
    @userData = @localStorageService.get('user') || {}

    return {
      request: (config) =>
        if _.isEmpty @userData
          @userData = @localStorageService.get('user') || {}

        @queue.push config

        @isTemplate = config.url.indexOf('.html') > 0
        
        @$rootScope.$emit 'showRequestOverlay', true
        
        config.headers.token = @userData.token || ''
        config.headers.production = @userData.is_production || false
        
        return config
      
      requestError: (rejection) =>
        @$rootScope.$emit 'showRequestOverlay', false

        _.remove @queue, response.config

        return @$q.reject rejection

      response: (response) =>
        _.remove @queue, response.config

        if !@isTemplate
          @$rootScope.$emit 'showFeedback',
            success: true
            text: response.data.messages[0].text if response and response.data and typeof response.data is "object" and response.data.messages and response.data.messages.length

        if @queue.length is 0 then @$rootScope.$emit('showRequestOverlay', false)
        
        return response or @$q.when(response)
      
      responseError: (rejection) =>
        @$rootScope.$emit 'showRequestOverlay', false

        _.remove @queue, rejection.config
        
        if rejection.status is 401
          $location.path "/login"
          return @$q.reject(rejection)

        if !@isTemplate
          @$rootScope.$emit 'showFeedback',
            success: false
            text: rejection.data.messages[0].text if rejection and rejection.data and typeof rejection.data is "object" and rejection.data.messages and rejection.data.messages.length

        if @queue.length is 0 then @$rootScope.$emit('showRequestOverlay', false)

        return @$q.reject rejection
    }