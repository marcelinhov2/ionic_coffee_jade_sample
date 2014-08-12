class FriendDetail extends Controller
  constructor: ($scope, $stateParams, friendsService) ->
    $scope.friend = friendsService.get($stateParams.friendId)
