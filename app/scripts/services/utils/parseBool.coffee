class ParseBool extends Service
  constructor: ->
    return {
      convert: (toTest) ->
        return (/^true$/i).test(toTest)
    }