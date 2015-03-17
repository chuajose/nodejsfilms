'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	tipo: {
		type: Number,
		default: 0,
		trim: true
	}
});

mongoose.model('Article', ArticleSchema);


/**
 * Article Schema
 */
var ArticleTipoSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	tipo: {
		type: Schema.ObjectId,
		ref: 'Tipo'
	}
});

mongoose.model('ArticleTipo', ArticleTipoSchema);


var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

 mongoose.model('Blog', blogSchema);