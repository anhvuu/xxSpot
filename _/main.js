(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    
    .controller('searchCtrl', ['$scope', function($scope) {    
      $scope.searchStr = '';
    }])
    
    
    .factory('xxFileFact', function() {
      
      return 'working factory!!';
    })
    
    .directive('xxDropFile', ['xxFileFact', function(xxFileFact) {
      return {
        restrict: 'A'
        ,scope: {
          options: '@xxDropFile'
          ,searchStr: '='
        }
        ,link: function(scope, elm, attrs) {
          var defaults = {
              parentElm: 'HTML'
              ,dragOverClass: 'dragOver'
            }
            ,opts = angular.extend({}, defaults, scope.$eval(scope.options))
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
          
          elm.bind('dragover dragenter dragleave', function(event) {
            event.preventDefault();
          }).bind('drop', function(event) {
            event.preventDefault();
            
            scope.searchStr = event.originalEvent.dataTransfer.files[0].name; 
            scope.$apply(); //needs this to update back to ctrl
            console.log('searchstr::', scope.searchStr, '----scope', scope);
            console.log('-----ready for factory ', event.originalEvent.dataTransfer.files[0]); //originalEvent only works with jQuery
          });
          
          console.log('calling factory:: ', xxFileFact);
        }
        
      };
    }])
    
    
  ;
})();
