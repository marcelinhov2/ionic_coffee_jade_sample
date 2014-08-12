class Friends extends Controller
  constructor: ($scope, friendsService) ->
    $scope.friends = friendsService.all()
