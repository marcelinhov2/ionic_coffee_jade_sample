'use strict';
var App;

App = (function() {
  function App() {}

  App.constructor = ['ionic', 'templates'];

  return App;

})();

angular.module('app', App());

var Run;

Run = (function() {
  function Run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  }

  return Run;

})();

angular.module('app').run(['$ionicPlatform', Run]);

var Config;

Config = (function() {
  function Config() {}

  return Config;

})();

angular.module('app').config([Config]);

var Routes;

Routes = (function() {
  function Routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    }).state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashController'
        }
      }
    }).state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsController'
        }
      }
    }).state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailController'
        }
      }
    }).state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountController'
        }
      }
    });
    $urlRouterProvider.otherwise('/tab/dash');
  }

  return Routes;

})();

angular.module('app').config(['$stateProvider', '$urlRouterProvider', Routes]);

var HttpStatusCodes;

HttpStatusCodes = (function() {
  function HttpStatusCodes() {}

  HttpStatusCodes.constructor = {
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found'
  };

  return HttpStatusCodes;

})();

angular.module('app').constant('HTTP_STATUS_CODES', HttpStatusCodes());

var Account;

Account = (function() {
  function Account($scope) {}

  return Account;

})();

angular.module('app').controller('accountController', ['$scope', Account]);

var Dash;

Dash = (function() {
  function Dash($scope) {}

  return Dash;

})();

angular.module('app').controller('dashController', ['$scope', Dash]);

var FriendDetail;

FriendDetail = (function() {
  function FriendDetail($scope, $stateParams, friendsService) {
    $scope.friend = friendsService.get($stateParams.friendId);
  }

  return FriendDetail;

})();

angular.module('app').controller('friendDetailController', ['$scope', '$stateParams', 'friendsService', FriendDetail]);

var Friends;

Friends = (function() {
  function Friends($scope, friendsService) {
    $scope.friends = friendsService.all();
  }

  return Friends;

})();

angular.module('app').controller('friendsController', ['$scope', 'friendsService', Friends]);

var Sample;

Sample = (function() {
  function Sample($timeout, trackFixtureService) {
    return {
      restrict: 'A',
      transclude: false,
      link: {
        post: function(scope, element, attrs) {
          return console.log('Linked');
        }
      }
    };
  }

  return Sample;

})();

angular.module('app').directive('sample', ['$timeout', 'trackFixtureService', Sample]);

var Sample;

Sample = (function() {
  function Sample() {
    return function(value) {
      return value;
    };
  }

  return Sample;

})();

angular.module('app').filter('sample', [Sample]);

var Friends;

Friends = (function() {
  function Friends() {
    var friends;
    friends = [
      {
        id: 0,
        name: 'Scruff McGruff'
      }, {
        id: 1,
        name: 'G.I. Joe'
      }, {
        id: 2,
        name: 'Miss Frizzle'
      }, {
        id: 3,
        name: 'Ash Ketchum'
      }
    ];
    this.all = function() {
      return friends;
    };
    this.get = function(friendId) {
      return friends[friendId];
    };
  }

  return Friends;

})();

angular.module('app').service('friendsService', [Friends]);
