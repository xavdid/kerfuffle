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

app.service("showService",function(){
    var show = '';

    return {
        getShow: function(){
            return show;
        },
        setShow: function(data){
            show = data;
        }
    };
});

app.controller('SearchController', function($scope, $http, $timeout, showService) {
    // declare some stuff
    $scope.result = '';
    $scope.loading = false;
    $scope.showStuff = false;
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
                // $scope.showStuff = false;
                $http.get('/find_show/'+tempText)
                    .success(function(data) {
                        $scope.loading = false;
                        if (data['status'] == 200){
                            $scope.showStuff = true;
                            $scope.result = data['title'];
                            $scope.showId = data['tvdb_id'];
                            $scope.posterUrl = data['images']['poster'];
                            $scope.overview = data['overview'];
                            showService.setShow(data);
                        }
                        else {
                            $scope.showStuff = false;
                            $scope.result = 'Not Found';
                            $scope.showId = '';
                            $scope.posterUrl = '';
                            $scope.overview = '';
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

app.controller('ShowController', function($scope, $http, $routeParams, showService){
    var show = showService.getShow();
    $scope.loading = true;
    $scope.showName = show['title'];
    $http.post('/random',{'seasons': show['seasons'], 'show_id':show['tvdb_id']}).
        success(function(data){
            $scope.loading = false;
            $scope.seasonNum = data['season'];
            $scope.episodeNum = data['number'];
            $scope.episodeTitle = data['title'];
        }).
        error(function(){
            $scope.loading = false;
            console.log("oops");
        });
    $scope.showName = show['title'];
});

