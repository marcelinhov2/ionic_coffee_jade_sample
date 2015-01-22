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
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/templates/views/login.html',
        controller: 'loginController'
      }).state('sectionmenu', {
        url: '/section',
        abstract: true,
        templateUrl: '/templates/directives/side-menu.html'
      }).state('sectionmenu.home', {
        url: '/home',
        views: {
          menuContent: {
            templateUrl: '/templates/views/home.html',
            controller: 'homeController'
          }
        }
      }).state('sectionmenu.test', {
        url: '/test',
        views: {
          menuContent: {
            templateUrl: '/templates/views/test.html',
            controller: 'testController'
          }
        }
      });
      $urlRouterProvider.otherwise('/login');
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
  var Home;

  Home = (function() {
    function Home($scope) {
      console.log('home');
    }

    return Home;

  })();

  angular.module('starter').controller('homeController', ['$scope', Home]);

}).call(this);

(function() {
  var Login;

  Login = (function() {
    function Login($scope) {
      console.log('login');
    }

    return Login;

  })();

  angular.module('starter').controller('loginController', ['$scope', Login]);

}).call(this);

(function() {
  var Test;

  Test = (function() {
    function Test($scope) {
      console.log('test');
    }

    return Test;

  })();

  angular.module('starter').controller('testController', ['$scope', Test]);

}).call(this);
