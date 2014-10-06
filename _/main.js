(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    .controller('mainCtrl', function($scope) {
      
    })
    .controller('searchCtrl', function($scope) {    
       
       
       
    })
    .directive('xxDragZone', function() {
      return {
        restrict: 'A'
        ,scope: true
        ,link: function(s, e, a) {
          var defaults = {
              dragOver: 'dragOver'
            }
            , opts = angular.extend({}, defaults, s.$eval(a.xxDragZone))
          ;
          
          e.bind('drop dragover dragenter dragleave', function(event) {
            event.preventDefault();
            
            if(event.type == 'dragover') {
              e.addClass(opts.dragOver);
            } else {
              e.removeClass(opts.dragOver);
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
