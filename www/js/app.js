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
    function Routes($stateProvider, $urlRouterProvider, $httpProvider) {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/templates/views/login.html',
        controller: 'loginController'
      }).state('logout', {
        url: '/logout',
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
      $httpProvider.interceptors.push('HttpRequestInterceptor');
    }

    return Routes;

  })();

  angular.module('starter').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', Routes]);

}).call(this);

(function() {
  var SearchTime;

  SearchTime = (function() {
    function SearchTime() {
      return [
        {
          interval: 1,
          label: "Hoje"
        }, {
          interval: 7,
          label: "Semana anterior"
        }, {
          interval: 15,
          label: "Últimos 15 dias"
        }, {
          interval: 30,
          label: "Mês anterior"
        }
      ];
    }

    return SearchTime;

  })();

  angular.module('starter').constant('SEARCH_TIME', SearchTime());

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
  var HttpRequestInterceptor;

  HttpRequestInterceptor = (function() {
    function HttpRequestInterceptor($q, $location, $rootScope, localStorageService) {
      this.$q = $q;
      this.$location = $location;
      this.$rootScope = $rootScope;
      this.localStorageService = localStorageService;
      this.queue = [];
      this.userData = this.localStorageService.get('user') || {};
      return {
        request: (function(_this) {
          return function(config) {
            if (_.isEmpty(_this.userData)) {
              _this.userData = _this.localStorageService.get('user') || {};
            }
            _this.queue.push(config);
            _this.isTemplate = config.url.indexOf('.html') > 0;
            _this.$rootScope.$emit('showRequestOverlay', true);
            config.headers.token = _this.userData.token || '';
            config.headers.production = _this.userData.is_production || false;
            return config;
          };
        })(this),
        requestError: (function(_this) {
          return function(rejection) {
            _this.$rootScope.$emit('showRequestOverlay', false);
            _.remove(_this.queue, response.config);
            return _this.$q.reject(rejection);
          };
        })(this),
        response: (function(_this) {
          return function(response) {
            _.remove(_this.queue, response.config);
            if (!_this.isTemplate) {
              _this.$rootScope.$emit('showFeedback', {
                success: true,
                text: response && response.data && typeof response.data === "object" && response.data.messages && response.data.messages.length ? response.data.messages[0].text : void 0
              });
            }
            if (_this.queue.length === 0) {
              _this.$rootScope.$emit('showRequestOverlay', false);
            }
            return response || _this.$q.when(response);
          };
        })(this),
        responseError: (function(_this) {
          return function(rejection) {
            _this.$rootScope.$emit('showRequestOverlay', false);
            _.remove(_this.queue, rejection.config);
            if (rejection.status === 401) {
              $location.path("/login");
              return _this.$q.reject(rejection);
            }
            if (!_this.isTemplate) {
              _this.$rootScope.$emit('showFeedback', {
                success: false,
                text: rejection && rejection.data && typeof rejection.data === "object" && rejection.data.messages && rejection.data.messages.length ? rejection.data.messages[0].text : void 0
              });
            }
            if (_this.queue.length === 0) {
              _this.$rootScope.$emit('showRequestOverlay', false);
            }
            return _this.$q.reject(rejection);
          };
        })(this)
      };
    }

    return HttpRequestInterceptor;

  })();

  angular.module('starter').factory('HttpRequestInterceptor', ['$q', '$location', '$rootScope', 'localStorageService', HttpRequestInterceptor]);

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
    function Dashboard($scope, $filter, $location, adminUserService, dashboardService, localStorageService, SEARCH_TIME, urlConfigService) {
      this.$scope = $scope;
      this.$filter = $filter;
      this.$location = $location;
      this.adminUserService = adminUserService;
      this.dashboardService = dashboardService;
      this.localStorageService = localStorageService;
      this.SEARCH_TIME = SEARCH_TIME;
      this.urlConfigService = urlConfigService;
      console.log('Dashboard');
    }

    return Dashboard;

  })();

  angular.module('starter').controller('dashboardController', ['$scope', '$filter', '$location', 'adminUserService', 'dashboardService', 'localStorageService', 'SEARCH_TIME', 'urlConfigService', Dashboard]);

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
  var AdminUser;

  AdminUser = (function() {
    function AdminUser($resource, $filter, urlConfigService, localStorageService) {
      var admin, update;
      this.$resource = $resource;
      this.$filter = $filter;
      this.urlConfigService = urlConfigService;
      this.localStorageService = localStorageService;
      admin = this.$resource(this.urlConfigService.api + "/admin_user/:admin_user_id", {}, {
        query: {
          method: "GET",
          params: {
            admin_user_id: "@admin_user_id"
          }
        },
        create: {
          method: "POST"
        },
        update: {
          method: "PUT",
          params: {
            admin_user_id: "@admin_user"
          }
        },
        remove: {
          method: "DELETE"
        }
      });
      update = function(id, user) {
        var _user;
        _user = user;
        this.localStorageService.set('user', JSON.stringify(user));
        return admin.update.call(this, id, user);
      };
      return {
        query: admin.query,
        create: admin.create,
        update: update,
        remove: admin.remove,
        getTimezoneOffset: (function(_this) {
          return function() {
            var _user;
            if (_user === (null || void 0)) {
              _user = _this.localStorageService.get('user');
            }
            if ("time_zone_offset" in _user) {
              return _user.time_zone_offset;
            } else {
              return -3.0;
            }
          };
        })(this),
        timeIntervalFirst: (function(_this) {
          return function(ts) {
            var _user;
            if (_user === (null || void 0)) {
              _user = _this.localStorageService.get('user');
            }
            if (typeof ts === "number" && ts > 0) {
              _user.time_interval_first = ts;
            }
            if ("time_interval_first" in _user) {
              return _user.time_interval_first;
            } else {
              return 0;
            }
          };
        })(this),
        timeIntervalLast: (function(_this) {
          return function(ts) {
            var _user;
            if (_user === (null || void 0)) {
              _user = _this.localStorageService.get('user');
            }
            if (typeof ts === "number" && ts > 0) {
              _user.time_interval_last = ts;
            }
            if ("time_interval_last" in _user) {
              return _user.time_interval_last;
            } else {
              return 0;
            }
          };
        })(this),
        timeInterval: (function(_this) {
          return function() {
            var _user;
            if (_user === (null || void 0)) {
              _user = _this.localStorageService.get('user');
            }
            if (("time_interval_first" in _user) && ("time_interval_last" in _user)) {
              return _user.time_interval_last - _user.time_interval_first;
            } else {
              return 0;
            }
          };
        })(this),
        utcTsToUserTime: (function(_this) {
          return function(ts, format) {
            var date, dms, offset;
            format = (format === undefined ? "dd/MM/yyyy HH:mm" : String(format));
            offset = _this.getTimezoneOffset() + new Date().getTimezoneOffset() / 60;
            dms = offset * 3600000;
            date = new Date(ts + dms);
            return _this.$filter("date")(date, format);
          };
        })(this)
      };
    }

    return AdminUser;

  })();

  angular.module('starter').service('adminUserService', ['$resource', '$filter', 'urlConfigService', 'localStorageService', AdminUser]);

}).call(this);

(function() {
  var Dashboard;

  Dashboard = (function() {
    function Dashboard($resource, urlConfigService) {
      var dashboard;
      this.$resource = $resource;
      this.urlConfigService = urlConfigService;
      dashboard = this.$resource(this.urlConfigService.api + "/dashboard/", {}, {
        get_all_stats: {
          method: "GET",
          url: this.urlConfigService.api + "/dashboard/all_stats/:start_date/:end_date/"
        }
      });
      return {
        get_all_stats: dashboard.get_all_stats
      };
    }

    return Dashboard;

  })();

  angular.module('starter').service('dashboardService', ['$resource', 'urlConfigService', Dashboard]);

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
