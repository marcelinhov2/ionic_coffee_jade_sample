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
  var Login,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Login = (function() {
    function Login($scope, $rootScope, $location, loginService, parseBoolService, localStorageService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$location = $location;
      this.loginService = loginService;
      this.parseBoolService = parseBoolService;
      this.localStorageService = localStorageService;
      this.requestPassword = __bind(this.requestPassword, this);
      this.submit = __bind(this.submit, this);
      this.logout = __bind(this.logout, this);
      this.deleteEmail = __bind(this.deleteEmail, this);
      this.saveEmail = __bind(this.saveEmail, this);
      this.setEmail = __bind(this.setEmail, this);
      this.setIsLogin = __bind(this.setIsLogin, this);
      this.define_template_methods = __bind(this.define_template_methods, this);
      this.declare_scope_vars = __bind(this.declare_scope_vars, this);
      this.declare_scope_vars();
      if (this.$location.$$path === "/logout") {
        this.logout();
      }
      this.set_listeners();
      this.define_template_methods();
      this.setEmail();
    }

    Login.prototype.set_listeners = function() {
      return this.$scope.$watch("isLogin", this.setIsLogin);
    };

    Login.prototype.declare_scope_vars = function() {
      this.$scope.login = {};
      this.$scope.forgot = {};
      return this.$scope.isLogin = this.parseBoolService.convert(this.localStorageService.get("isLogin"));
    };

    Login.prototype.define_template_methods = function() {
      this.$scope.submit = this.submit;
      this.$scope.forgotPassword = this.forgotPassword;
      this.$scope.closePasswordOverlay = this.closePasswordOverlay;
      this.$scope.closePwSuccessOverlay = this.closePwSuccessOverlay;
      return this.$scope.requestPassword = this.requestPassword;
    };

    Login.prototype.handleLoginError = function(data) {
      return this.$scope.messages = (data && data.messages ? data.messages : [
        {
          text: "connection error"
        }
      ]);
    };

    Login.prototype.setIsLogin = function() {
      return this.localStorageService.set("isLogin", this.$scope.isLogin);
    };

    Login.prototype.setEmail = function() {
      this.$scope.login.email = this.localStorageService.get("lastEmail") || "";
      if (this.$scope.login.email) {
        return this.$scope.saveEmail = true;
      }
    };

    Login.prototype.saveEmail = function() {
      return this.localStorageService.set("lastEmail", this.localStorageService.get("user").email);
    };

    Login.prototype.deleteEmail = function() {
      return this.localStorageService.remove("lastEmail");
    };

    Login.prototype.logout = function() {
      this.setEmail();
      this.localStorageService.remove("user");
      return this.$rootScope.$broadcast("logout", [1, 2, 3]);
    };

    Login.prototype.submit = function() {
      return this.loginService.log(this.$scope.login).$promise.then((function(_this) {
        return function(data) {
          var url;
          if (data.status === "OK") {
            _this.localStorageService.set("user", JSON.stringify(data.content));
            url = _this.localStorageService.get("firstUrl") || "/dashboard";
            _this.localStorageService.remove("firstUrl");
            if (_this.$scope.saveEmail) {
              _this.saveEmail();
            } else {
              _this.deleteEmail();
            }
            return _this.$location.path("/section/dashboard");
          } else {
            return _this.handleLoginError(data);
          }
        };
      })(this));
    };

    Login.prototype.requestPassword = function() {
      return this.loginService.password(this.$scope.forgot).$promise.then((function(_this) {
        return function(data) {
          _this.$scope.passwordOverlay = false;
          _this.$scope.pwSuccessOverlay = true;
          return _this.$scope.forgot.password_forgotten_email = "";
        };
      })(this));
    };

    return Login;

  })();

  angular.module('starter').controller('loginController', ['$scope', '$rootScope', '$location', 'loginService', 'parseBoolService', 'localStorageService', Login]);

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
