(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    
    .controller('searchCtrl', ['$scope', function($scope) {    
      
    }])
    
    
    .factory('xxFileFact', function() {
      
      return 'working factory!!';
    })
    
    .directive('xxDropFile', ['xxFileFact', function(xxFileFact) {
      return {
        restrict: 'EA'
        ,scope: {
          'option': '@xxDropFile'
        }
        ,link: function(scope, elm, attrs) {
          console.log('----------link first');
          console.log('===xxFileFact::fromt LIIIINK--::', xxFileFact);
          console.log('+++++++++++++::', scope.option);
          console.log('+++++++++++++::', scope.$eval(scope.option));
          
          
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
          
          elm.bind('dragover dragenter dragleave', function(event) {
            event.preventDefault();
          }).bind('drop', function(event) {
            event.preventDefault();
            
            console.log('----- ', event.originalEvent.dataTransfer.files[0]); //originalEvent only works with jQuery
          });
          
          console.log('y000', scope.aaazbbb);
          scope.run(6);
        }
        ,controller: function($scope) {
          console.log('----------controler first');
          $scope.aaazbbb = 'sjdkhfjsdk kdk';
          
          
          console.log('===xxFileFact::fromt control---::', xxFileFact);
          console.log('= control---::', $scope.yo);
          
          $scope.run = function(val) {
            console.log(val +'running...');
          };
        }
        
      };
    }])
    
    
  ;
})();
