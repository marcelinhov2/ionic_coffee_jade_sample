class Sample extends Directive
  constructor: ($timeout, trackFixtureService) ->
    return {
      restrict: 'A'
      transclude: false
      link:
        post: (scope, element, attrs) ->
          console.log 'Linked'

    } # end of directive object, (4 spaces)
