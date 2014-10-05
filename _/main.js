(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    .controller('mainCtrl', function($scope) {
    
    })
    .controller('searchCtrl', function($scope) {    
    
    })
    .directive('dragZone', function(conf) {
      return {
        restrict: 'EA'
        ,link: function(s, e, a) {
          e.bind('drop dragover dragenter dragleave', function(event) {
            event.preventDefault();
            
            if(event.type == 'dragover') {
              e.addClass(conf.dragOverClass);
            } else {
              e.removeClass(conf.dragOverClass);
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
            console.log('==', event.dataTransfer.files[0]);
          });
          
          
        }
      };
    }])
  ;
})();
