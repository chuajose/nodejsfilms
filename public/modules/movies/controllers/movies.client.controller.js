'use strict';

angular.module('movies').controller('MoviesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Movies', 'MoviesSearch',
	function($scope, $stateParams, $location, Authentication, Movies, MoviesSearch) {
		$scope.authentication = Authentication;

		$scope.find = function() {
			var data = {
		        movie: $scope.movie
		    };
			var movies = MoviesSearch.post({},data).$promise.then(function(movies) {
      			$scope.movies = movies.results;
    		});

			
			//console.log(movies);
			//$scope.movies = movies.results;
		};

		$scope.list = function() {

			var movies = Movies.get().$promise.then(function(movies) {
      			$scope.movies = movies.results;
    		});

			
			//console.log(movies);
			//$scope.movies = movies.results;
		};


		$scope.findOne = function() {

			var movies = Movies.get(
				{
					movieId: $stateParams.movieId
				}
			).$promise.then(function(movie) {
      			$scope.movie = movie;
    		});

			
		};
	}
]);