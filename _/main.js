(function(){
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    
    .controller('searchCtrl', ['$scope', 'spotifyAPI', function($scope, spotifyAPI) {
      $scope.searchStr = '';
      
      
      
      
      
      $scope.searchSubmit = function() {
        console.log('int search::: '+ $scope.searchStr);
        spotifyAPI.searchTrack($scope.searchStr, function(data) {
          console.log('calling back data::', data);
          
        });
      }
      
    }])
    
    
    
    .factory('spotifyAPI', ['$http', function($http) { 
      var factory = {};
      
      factory.searchTrack = function(str, cb) {
        var returnData = {};
        $http.get('//ws.spotify.com/search/1/track.json?q='+ str)
          .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            returnData.data = data;
            returnData.status = status;
            cb(returnData);
          })
          .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            returnData.data = data;
            returnData.status = status;
            cb(returnData);
          })
        ;
      };
      
      return factory;
    }])
    
    .factory('xxFileFact', ['$http', function($http) {
      
      return 'working factory!!';
    }])
    
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
