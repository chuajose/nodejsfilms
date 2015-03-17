'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Article = mongoose.model('Article'),
	ArticleTipo = mongoose.model('ArticleTipo'),
	Blog = mongoose.model('Blog'),
	_ = require('lodash');
var _this = this;
/**
 * Create a article
 */
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			for (var i = 0; i < articles.length; i++) {

				var tipo =  _this.tipoByID(articles[i].tipo);
				console.log(tipo);
				//console.log(articles[i]);

			}
			//console.log(articles);
			res.json(articles);
		}
	});
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

exports.tipoByID = function(id){


	ArticleTipo.find({title:'Documento'}).exec(function(err, tipo) {
		if (err) console.log(err);
		
		 console.log(tipo);
	});

	var res = ArticleTipo.find(function (err, id) {
  	if (err) return console.error(err);
  	//console.log(res)
})

};