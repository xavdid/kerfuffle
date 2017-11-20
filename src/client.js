var angular = require('angular')

angular.module('MediaApp', [])
  .controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.refresh = function () {
      $scope.loading = true
      $http.get(`/api/${$scope.media_type}`)
        .then(function (data) {
          // this could be put into better logic trees
          var media = data.data.media
          if ($scope.res && (!media || media.id === $scope.res.id)) {
            // no repeats or bums!
            $scope.refresh()
          } else {
            $scope.loading = false
            $scope.res = data.data.media
            $scope.task = data.data.task
          }
        })
        .catch(function (err) {
          console.log(err)
          $scope.loading = false
        })
    }

    $scope.gbooksImage = function (id) {
      // there are a fair amount of books who don't have zoom 2, but zoom 1 is too small
      // it doesn't throw a 404 though, it's an image that says no image
      // hard to catch
      return `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2&source=gbs_api`
    }

    $scope.media_type = window.location.pathname.substring(1)
    $scope.refresh()
  }])
