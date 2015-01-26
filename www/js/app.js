'use strict';
(function() {
  var App;

  App = (function() {
    function App() {
      return ['ionic', 'templates', 'ngCordova', 'ngResource', 'LocalStorageModule'];
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
      }).state('sectionmenu.dashboard', {
        url: '/dashboard',
        views: {
          menuContent: {
            templateUrl: '/templates/views/dashboard.html',
            controller: 'dashboardController'
          }
        }
      }).state('sectionmenu.transactions', {
        url: '/transactions',
        views: {
          menuContent: {
            templateUrl: '/templates/views/transactions.html',
            controller: 'transactionsController'
          }
        }
      }).state('sectionmenu.transactionDetail', {
        url: '/transactionDetail',
        views: {
          menuContent: {
            templateUrl: '/templates/views/transactionDetail.html',
            controller: 'transactionDetailController'
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
    function App($scope, $rootScope, $timeout, $location, $ionicSideMenuDelegate, $ionicPlatform, $cordovaSplashscreen, localStorageService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
      this.$location = $location;
      this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
      this.$ionicPlatform = $ionicPlatform;
      this.$cordovaSplashscreen = $cordovaSplashscreen;
      this.localStorageService = localStorageService;
      this.toggleRight = __bind(this.toggleRight, this);
      this.defineTemplateMethods = __bind(this.defineTemplateMethods, this);
      this.defineTemplateMethods();
      this.init();
    }

    App.prototype.defineTemplateMethods = function() {
      return this.$scope.toggleRight = this.toggleRight;
    };

    App.prototype.init = function() {
      this.$rootScope.$on("$locationChangeStart", (function(_this) {
        return function(next, current) {
          return _this.hasUser();
        };
      })(this));
      return this.$ionicPlatform.ready((function(_this) {
        return function() {
          return _this.$cordovaSplashscreen.hide();
        };
      })(this));
    };

    App.prototype.hasUser = function() {
      if (!this.localStorageService.get('user')) {
        return this.$location.path("/login");
      }
    };

    App.prototype.toggleRight = function() {
      return this.$ionicSideMenuDelegate.toggleRight();
    };

    return App;

  })();

  angular.module('starter').controller('appController', ['$scope', '$rootScope', '$timeout', '$location', '$ionicSideMenuDelegate', '$ionicPlatform', '$cordovaSplashscreen', 'localStorageService', App]);

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
  var Dashboard;

  Dashboard = (function() {
    function Dashboard($scope) {
      console.log('Dashboard');
    }

    return Dashboard;

  })();

  angular.module('starter').controller('dashboardController', ['$scope', Dashboard]);

}).call(this);

(function() {
  var Login;

  Login = (function() {
    function Login($scope, loginService) {
      this.loginService = loginService;
      console.log(this.loginService);
    }

    return Login;

  })();

  angular.module('starter').controller('loginController', ['$scope', 'loginService', Login]);

}).call(this);

(function() {
  var TransactionDetail;

  TransactionDetail = (function() {
    function TransactionDetail($scope) {
      console.log('TransactionDetail');
    }

    return TransactionDetail;

  })();

  angular.module('starter').controller('transactionDetailController', ['$scope', TransactionDetail]);

}).call(this);

(function() {
  var Transactions;

  Transactions = (function() {
    function Transactions($scope) {
      console.log('transaction');
    }

    return Transactions;

  })();

  angular.module('starter').controller('transactionsController', ['$scope', Transactions]);

}).call(this);

(function() {
  var Login;

  Login = (function() {
    function Login($resource, urlConfigService) {
      var login;
      this.$resource = $resource;
      this.urlConfigService = urlConfigService;
      console.log(this.urlConfigService);
      login = this.$resource(this.urlConfigService.api + "/admin_user/", {}, {
        create: {
          method: "POST"
        },
        log: {
          method: "POST",
          url: this.urlConfigService.api + "/admin_user/login/"
        },
        password: {
          method: "POST",
          url: this.urlConfigService.api + "/user/forgot_password/"
        }
      });
      return {
        create: login.create,
        log: login.log,
        password: login.password
      };
    }

    return Login;

  })();

  angular.module('starter').service('loginService', ['$resource', 'urlConfigService', Login]);

}).call(this);

(function() {
  var ParseBool;

  ParseBool = (function() {
    function ParseBool() {
      return {
        convert: function(toTest) {
          return /^true$/i.test(toTest);
        }
      };
    }

    return ParseBool;

  })();

  angular.module('starter').service('parseBoolService', [ParseBool]);

}).call(this);

(function() {
  var UrlConfig;

  UrlConfig = (function() {
    function UrlConfig() {
      return {
        'environment': 'testing',
        'api': 'https://api-testing.intelipost.com.br/api/v1',
        'localApi': 'http://localhost:8080/esprinter-web/api/v1',
        'testTomcat': 'http://54.207.14.221:31003/api/v1'
      };
    }

    return UrlConfig;

  })();

  angular.module('starter').service('urlConfigService', [UrlConfig]);

}).call(this);
