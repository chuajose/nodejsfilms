'use strict';

/**
 * Module dependencies.
 */
var  movies = require('../../app/controllers/movies.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/movies')
		.get(movies.list);
	app.route('/movies/:movieId')
		.get(movies.read);
	app.route('/movies/find')
		.post(movies.find);


	// Finish by binding the article middleware
	//app.param('articleId', articles.articleByID);
};