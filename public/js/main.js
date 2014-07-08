var app = angular.module('Kerfuffle', ['ngRoute', 'ngAnimate'])

app.config(function($routeProvider, $locationProvider, $animateProvider){
    $routeProvider.
        when('/', {
            templateUrl: '/render_search',
            controller: 'SearchController'
        }).
        when('/show/:showId', {
            templateUrl: '/render_show',
            controller: 'ShowController'
        });
        // otherwise({
        //     redirectTo: '/'
        // });

    // allows hiding of spinner. this witchcraft provided by
    // http://stackoverflow.com/questions/24617821/stop-angular-animation-from-happening-on-ng-show-ng-hide
    $animateProvider.classNameFilter(/^((?!(fa-cog)).)*$/);
    $locationProvider.html5Mode(true);
});

app.controller('SearchController', function($scope, $http, $timeout) {
    // declare some stuff
    $scope.result = '';
    $scope.loading = false;
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
                $scope.loading = true;
                var url = 'http://api.trakt.tv/search/shows.json/2fda7d38904aefdeb7da3222131906ad?query=' + tempText +'&seasons=1&callback=JSON_CALLBACK';
                $http.jsonp(url)
                    .success(function(data) {
                        $scope.loading = false;
                        if (data.length > 0){
                            $scope.result = data[0]['title'];
                            $scope.showId = data[0]['tvdb_id'];
                            return true;
                        }
                        else {
                            $scope.result = "Not Found";
                            return false;
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

