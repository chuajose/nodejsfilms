'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('movies').factory('Movies', ['$resource',
	function($resource) {
		console.log($resource);
		return $resource('movies/:movieId', {
			articleId: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('movies').factory('MoviesSearch', ['$resource',
	function($resource) {
		console.log($resource);
		return $resource('movies/find', {
			//movie: 'cas'
		}, {
			update: {
				method: 'PUT'
			},
			post: {
				method: 'POST'
			}
		});
	}
]);