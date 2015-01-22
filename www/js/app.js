'use strict';
(function() {
  var App;

  App = (function() {
    function App() {
      return ['ionic', 'templates'];
    }

    return App;

  })();

  angular.module('starter', new App());

}).call(this);

(function() {
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

  angular.module('starter').run(['$ionicPlatform', Run]);

}).call(this);

(function() {
  var Config;

  Config = (function() {
    function Config() {}

    return Config;

  })();

  angular.module('starter').config([Config]);

}).call(this);

(function() {
  var Routes;

  Routes = (function() {
    function Routes($stateProvider, $urlRouterProvider) {
      $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: '/templates/tabs.html'
      }).state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: '/templates/tab-dash.html',
            controller: 'dashController'
          }
        }
      }).state('tab.friends', {
        url: '/friends',
        views: {
          'tab-friends': {
            templateUrl: '/templates/tab-friends.html',
            controller: 'friendsController'
          }
        }
      }).state('tab.friend-detail', {
        url: '/friend/:friendId',
        views: {
          'tab-friends': {
            templateUrl: '/templates/friend-detail.html',
            controller: 'friendDetailController'
          }
        }
      }).state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: '/templates/tab-account.html',
            controller: 'accountController'
          }
        }
      });
      $urlRouterProvider.otherwise('/tab/dash');
    }

    return Routes;

  })();

  angular.module('starter').config(['$stateProvider', '$urlRouterProvider', Routes]);

}).call(this);

(function() {
  var HttpStatusCodes;

  HttpStatusCodes = (function() {
    function HttpStatusCodes() {
      return {
        '401': 'Unauthorized',
        '403': 'Forbidden',
        '404': 'Not Found'
      };
    }

    return HttpStatusCodes;

  })();

  angular.module('starter').constant('HTTP_STATUS_CODES', HttpStatusCodes());

}).call(this);

(function() {
  var Account;

  Account = (function() {
    function Account($scope) {}

    return Account;

  })();

  angular.module('starter').controller('accountController', ['$scope', Account]);

}).call(this);

(function() {
  var App,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {
    function App($scope, $ionicSideMenuDelegate) {
      this.$scope = $scope;
      this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
      this.toggleRight = __bind(this.toggleRight, this);
      this.defineTemplateMethods = __bind(this.defineTemplateMethods, this);
      this.defineTemplateMethods();
    }

    App.prototype.defineTemplateMethods = function() {
      return this.$scope.toggleRight = this.toggleRight;
    };

    App.prototype.toggleRight = function() {
      return this.$ionicSideMenuDelegate.toggleRight();
    };

    return App;

  })();

  angular.module('starter').controller('appController', ['$scope', '$ionicSideMenuDelegate', App]);

}).call(this);

(function() {
  var Dash;

  Dash = (function() {
    function Dash($scope) {}

    return Dash;

  })();

  angular.module('starter').controller('dashController', ['$scope', Dash]);

}).call(this);

(function() {
  var FriendDetail;

  FriendDetail = (function() {
    function FriendDetail($scope, $stateParams, friendsService) {
      $scope.friend = friendsService.get($stateParams.friendId);
    }

    return FriendDetail;

  })();

  angular.module('starter').controller('friendDetailController', ['$scope', '$stateParams', 'friendsService', FriendDetail]);

}).call(this);

(function() {
  var Friends;

  Friends = (function() {
    function Friends($scope, friendsService) {
      $scope.friends = friendsService.all();
    }

    return Friends;

  })();

  angular.module('starter').controller('friendsController', ['$scope', 'friendsService', Friends]);

}).call(this);

(function() {
  var Menu;

  Menu = (function() {
    function Menu($scope) {
      var i;
      this.$scope = $scope;
      this.$scope.data = {
        items: []
      };
      i = 0;
      while (i < 25) {
        this.$scope.data.items.push({
          id: i,
          label: "Item " + i
        });
        i++;
      }
    }

    return Menu;

  })();

  angular.module('starter').controller('menuController', ['$scope', Menu]);

}).call(this);

(function() {
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

  angular.module('starter').directive('sample', ['$timeout', 'trackFixtureService', Sample]);

}).call(this);

(function() {
  var SideMenu;

  SideMenu = (function() {
    function SideMenu() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/side-menu.html',
        controller: 'sideMenuController'
      };
    }

    return SideMenu;

  })();

  angular.module('starter').directive('sideMenu', [SideMenu]);

}).call(this);

(function() {
  var Sample;

  Sample = (function() {
    function Sample() {
      return function(value) {
        return value;
      };
    }

    return Sample;

  })();

  angular.module('starter').filter('sample', [Sample]);

}).call(this);

(function() {
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

  angular.module('starter').service('friendsService', [Friends]);

}).call(this);

(function() {
  var SideMenu;

  SideMenu = (function() {
    function SideMenu($scope) {
      var i;
      this.$scope = $scope;
      this.$scope.data = {
        items: []
      };
      i = 0;
      while (i < 25) {
        this.$scope.data.items.push({
          id: i,
          label: "Item " + i
        });
        i++;
      }
    }

    return SideMenu;

  })();

  angular.module('starter').controller('sideMenuController', ['$scope', SideMenu]);

}).call(this);
