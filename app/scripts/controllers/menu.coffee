class Menu extends Controller
  constructor: (@$scope) ->
    @$scope.data = items: []
    i = 0

    while i < 25
      @$scope.data.items.push
        id: i
        label: "Item " + i

      i++