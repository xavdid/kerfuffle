var app = angular.module('Kerfuffle', ['ngRoute'])

app.config(function($routeProvider, $locationProvider){
    $routeProvider.
        when('/', {
            templateUrl: '/search',
            controller: 'SearchController'
        }).
        when('/show/:showId', {
            templateUrl: '/show',
            controller: 'ShowController'
        });
        // otherwise({
        //     redirectTo: '/'
        // });

    $locationProvider.html5Mode(true);
});

app.controller('SearchController', function($scope, $http, $timeout) {
    // declare some stuff
    $scope.result = '';
    // $scope.showResult = true;
    var init = true;
    var tempText = '', filterTextTimeout;

    // run this whenever a change happens in query
    $scope.$watch('query', function(val){
        if (init || val.length < 2) {init = false;}
        else {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
            tempText = val;

            // loop
            filterTextTimeout = $timeout(function(){
                var url = 'http://api.trakt.tv/search/shows.json/2fda7d38904aefdeb7da3222131906ad?query=' + tempText +'&seasons=1&callback=JSON_CALLBACK';
                $http.jsonp(url)
                    .success(function(data) {
                        if (data.length > 0){
                            $scope.result = data[0]['title'];
                            $scope.showId = data[0]['tvdb_id'];
                        }
                        else {
                            $scope.result = "Not Found";
                        }
                        // console.log(data);
                    })
                    .error(function(data, error) {
                        $scope.result = 'womp womp';
                        console.log('oops '+error);
                    }); 
            }, 500);
        }
    })
});

app.controller('ShowController', function($scope, $routeParams){
    $scope.showName = $routeParams.showId;
});

