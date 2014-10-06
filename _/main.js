(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    
    .controller('searchCtrl', ['$scope', function($scope) {    
       
       
       
    }])
    
    
    .directive('xxDragZone', function() { //can i do all this with just existing directives, ngClass?
      return {
        restrict: 'A'
        ,scope: true
        ,link: function(scope, elm, attrs) {
          var defaults = {
              dragOver: 'dragOver'
            }
            , opts = angular.extend({}, defaults, scope.$eval(attrs.xxDragZone))
          ;
          
          elm.bind('drop dragover dragenter dragleave', function(event) {
            event.preventDefault();
            
            if(event.type == 'dragover') {
              elm.addClass(opts.dragOver);
            } else {
              elm.removeClass(opts.dragOver);
            }
          });
        }
      };
    })
    
    
    .directive('dropZone', ['conf', function(conf) {
      return {
        restrict: 'A'
        ,link: function(s, e, a) {
          e.bind('dragover dragenter dragleave', function(event) {
            event.preventDefault();
          }).bind('drop', function(event) {
            event.preventDefault();
            //console.log('==', event.dataTransfer.files[0]);
            console.log('==', event.dataTransfer);
          });
          
          
        }
      };
    }])
    
    
  ;
})();
