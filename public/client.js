var angular = require('angular')
var config = require('../config')

angular.module('MediaApp', [])
  .controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.refresh = function () {
      $scope.loading = true
      var service = config[$scope.media_type].service
      $http.get(`/api/${$scope.media_type}`).then(function (data) {
        // this could be put into better logic trees
        var media = data.data.media
        if (
          // no repeats or bums!
          $scope.res && (
            !media ||
              (service === 'gbooks' && media.id === $scope.res.id) ||
              (service !== 'gbooks' && media[media.type].ids.trakt === $scope.res[media.type].ids.trakt)
          )
        ) { $scope.refresh() } else {
          $scope.loading = false
          $scope.res = data.data.media
          $scope.task = data.data.task
        }
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
