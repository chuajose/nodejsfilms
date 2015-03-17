'use strict';

// Setting up route
angular.module('movies').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listMovies', {
			url: '/movies',
			templateUrl: 'modules/movies/views/list-movies.client.view.html'
		}).
		state('viewMovie', {
			url: '/movies/:movieId',
			templateUrl: 'modules/movies/views/view-movie.client.view.html'
		});
	}
]);