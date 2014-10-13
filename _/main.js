(function() {
  angular.module('xxSpot', [])
    .constant('conf', {
      dragOverClass: 'dragOver'
    })
    
    .factory('spotifyAPI', ['$http', function($http) {
      var spotifyAPI = {};
      
      spotifyAPI.searchTrack = function(str) {
        return $http.get('//ws.spotify.com/search/1/track.json?q='+ str);
      };
      
      return spotifyAPI;
    }])
    
    .factory('xxFileFact', ['$http', function($http) {
      
      return 'working factory!!';
    }])
    
    .controller('mainCtrl', ['$scope', 'spotifyAPI', function($scope, spotifyAPI) {
      
      
    }])
    
    
    .controller('searchCtrl', ['$scope', 'spotifyAPI', function($scope, spotifyAPI) {
      $scope.searchStr = '';
      $scope.searchResults = {
        data: null
        ,status: null
      };
      
      $scope.searchSubmit = function() {
        console.log('int search::: '+ $scope.searchStr);
        
        spotifyAPI.searchTrack($scope.searchStr)
          .success(function(data, status) {
            console.log('got data back:::', data);
            console.log('got status back:::', status);
          })
          .error(function(error, status) {
            console.log('got error:::---', error, '---');
            console.log('got status:::', status);
          })
        ;
      }
      
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
