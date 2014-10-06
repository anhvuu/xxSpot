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
        restrict: 'EA'
        ,scope: true
        ,link: function(s, e, a) {
          var opts = {}; //make this extentable with pass in opts
          
          
          opts = s.$eval(a.xxDragZone);
          /*
          s.$watch(a.xxDragZone, function(options) {
            opts = options;
          });
          */
          
          e.bind('drop dragover dragenter dragleave', function(event) {
            event.preventDefault();
            
            if(event.type == 'dragover') {
              e.addClass(opts.over);
            } else {
              e.removeClass(opts.over);
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
