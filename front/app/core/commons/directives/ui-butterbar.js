angular.module('app')
  .directive('uiButterbar', ['$rootScope', '$anchorScroll', '$transitions', function($rootScope, $anchorScroll, $transitions) {
     return {
      restrict: 'AC',
      template:'<span class="bar"></span>',
      link: function(scope, el, attrs) {        
        el.addClass('butterbar hide');
        /*scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
          event.targetScope.$watch('$viewContentLoaded', function(){
            el.addClass('hide').removeClass('active');
          })
        });*/

        $transitions.onStart({ }, function(trans) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });

        $transitions.onSuccess({ }, function(trans) {
          el.addClass('hide').removeClass('active');
        });
      }
     };
  }]);