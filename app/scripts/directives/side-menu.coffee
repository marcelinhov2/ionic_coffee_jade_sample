class SideMenu extends Directive
  constructor: ->
    return {
      restrict: 'E'
      templateUrl: '/templates/directives/side-menu.html'
      controller: 'sideMenuController'
    }
