class UrlConfig extends Service
  constructor: ->
    return {
      'environment'   : 'testing',
      'api'           : 'https://api-testing.intelipost.com.br/api/v1',
      'localApi'      : 'http://localhost:8080/esprinter-web/api/v1',
      'testTomcat'    : 'http://54.207.14.221:31003/api/v1'
    }