'use strict';
var Q = require('q');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	//Article = mongoose.model('Article'),
	//ArticleTipo = mongoose.model('ArticleTipo'),
	//Blog = mongoose.model('Blog'),
	_ = require('lodash');
var _this = this;
var MovieDB = require('moviedb')('e50a2de6fbfaf4e5e696dcec9894a6c5','es');


/**
 * Show the current article
 */
exports.read = function(req, res) {

	showMovie(req).then(function(val) {

    	res.json(val)
	 	 console.log('resolved read', val);

	}, function(err) {
	  // Will receive rejections from doSomethingAsync or bubbled from asyncHelper
	  console.log('error', err);

	});
};

/**
 * Show the current article
 */
exports.find = function(req, res) {

	findMovie(req).then(function(val) {

    	res.json(val)
	 	 //console.log('resolved read', req);

	}, function(err) {
	  // Will receive rejections from doSomethingAsync or bubbled from asyncHelper
	  console.log('error', err);

	});
};


/**
 * List of Articles
 */
exports.list = function(req, res) {
	//var deferred = q.defer();

	
    showMovies().then(function(val) {

    	res.json(val)
	  console.log('resolved list', val);

	}, function(err) {
	  // Will receive rejections from doSomethingAsync or bubbled from asyncHelper
	  console.log('error', err);

	});
	/*MovieDB.searchMovie({query: 'Celda 211'}, function(err, data){
	  //console.log(res);
	  res.*json(data);
	});*/

};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Article is invalid'
		});
	}

	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) {
			return res.status(404).send({
  				message: 'Article not found'
  			});
		}
		req.article = article;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};


function  showMovies(){
	    var deferred = Q.defer();

		MovieDB.miscTopRatedMovies(function(err, res){
		  //console.log(res);
		  deferred.resolve(res);
		});
		
		return deferred.promise;
}
function  showMovie(req){
	    var deferred = Q.defer();

		MovieDB.movieInfo({id: req.param('movieId'),language:'es'}, function(err, data){
			deferred.resolve(data);
		});
		
		return deferred.promise;
}
/**
 * [findMovie search filme]
 * @param  {[type]} req movie to search and paga to show
 * @return {[type]}     [promise]
 */
function  findMovie(req){
		console.log(req.body);
	    var deferred = Q.defer();
		MovieDB.searchMovie({query: req.body.movie, page: req.body.page }, function(err, response){
			deferred.resolve(response);
		});

		
		return deferred.promise;
}