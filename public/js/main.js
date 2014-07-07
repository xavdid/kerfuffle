var app = angular.module('Kerfuffle', [])

app.controller('ShowController', function($scope, $http, $timeout) {
    $scope.result = '';
    var init = true;
    var tempText = '', filterTextTimeout;
    $scope.$watch('query', function(val){
        if (init || val.length < 2) {init = false;}
        else {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
            tempText = val;
            
            filterTextTimeout = $timeout(function(){
                var url = 'http://api.trakt.tv/search/shows.json/2fda7d38904aefdeb7da3222131906ad?query=' + tempText +'&seasons=1&callback=JSON_CALLBACK';
                $http.jsonp(url)
                    .success(function(data) {
                        if (data.length > 0){
                            $scope.result = data[0]['title'];
                        }
                        else {
                            $scope.result = "Not Found";
                        }
                        console.log(data);
                    })
                    .error(function(data, error) {
                        $scope.result = 'womp womp';
                        console.log('oops '+error);
                    }); 
            }, 500);
        }
    })
});

