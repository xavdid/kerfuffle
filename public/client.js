var angular = require('angular');

angular.module('MediaApp', [])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.refresh = function() {
      $scope.loading = true;
      $http.get(`/api/${$scope.media_type}`).then(function(data) {
        if (
          // no repeats or bums!
          $scope.res && (
            !data.data ||
            ($scope.media_type === 'books' && data.data.id === $scope.res.id) ||
            ($scope.media_type != 'books' && data.data[data.data.type].ids.trakt === $scope.res[data.data.type].ids.trakt)
          )
        ) {console.log('freshin'); $scope.refresh();}
        else {
          $scope.loading = false;
          $scope.res = data.data;
        }
      });
    };

    $scope.gbooksImage = function(id) {
      return `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2&source=gbs_api`;
    };

    $scope.media_type = location.pathname.substring(1);
    $scope.refresh();
  }]);