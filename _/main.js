(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    
    .controller('searchCtrl', ['$scope', function($scope) {    
       
       
       
    }])
    
    
    .directive('xxDropFile', function() {
      return {
        restrict: 'A'
        ,scope: true
        ,link: function(scope, elm, attrs) {
          var defaults = {
              parentElm: 'HTML'
              ,dragOverClass: 'dragOver'
            }
            ,opts = angular.extend({}, defaults, scope.$eval(attrs.xxDropFile))
            ,$parentElm = angular.element(opts.parentElm)
          ;
          
          $parentElm.bind('drop dragover dragenter dragleave', function(event) {
            event.preventDefault();
            
            if(event.type == 'dragover') {
              $(this).addClass(opts.dragOverClass);
            } else {
              $(this).removeClass(opts.dragOverClass);
            }
          });
          
          
          
        /*
          e.bind('dragover dragenter dragleave', function(event) {
            event.preventDefault();
          }).bind('drop', function(event) {
            event.preventDefault();
            //console.log('==', event.dataTransfer.files[0]);
            console.log('==', event.dataTransfer);
          });
        */
          
        }
      };
    })
    
    
  ;
})();
