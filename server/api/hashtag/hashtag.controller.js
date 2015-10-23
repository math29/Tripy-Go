'use strict';

var _ = require('lodash');
var Hashtag = require('./hashtag.model');

// Get list of hashtags
exports.index = function(req, res) {
  Hashtag.find(function (err, hashtags) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(hashtags);
  });
};

// Get a single hashtag
exports.show = function(req, res) {
  Hashtag.findById(req.params.id, function (err, hashtag) {
    if(err) { return handleError(res, err); }
    if(!hashtag) { return res.status(404).send('Not Found'); }
    return res.json(hashtag);
  });
};

// Get a single hashtag
exports.showByName = function(req, res) {
  Hashtag.findByName(req.params.name, function (err, hashtag) {
    if(err) { return handleError(res, err); }
    if(!hashtag) { return res.status(404).send('Not Found'); }
    return res.json(hashtag);
  });
};

// Creates a new hashtag in the DB.
exports.create = function(req, res) {
	console.log(req.body);
  delete req.body.date_created;
  Hashtag.create(req.body, function(err, hashtag) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(hashtag);
  });
};

// Updates an existing hashtag in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hashtag.findById(req.params.id, function (err, hashtag) {
    if (err) { return handleError(res, err); }
    if(!hashtag) { return res.status(404).send('Not Found'); }
    var updated = _.merge(hashtag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(hashtag);
    });
  });
};

// Deletes a hashtag from the DB.
exports.destroy = function(req, res) {
  Hashtag.findById(req.params.id, function (err, hashtag) {
    if(err) { return handleError(res, err); }
    if(!hashtag) { return res.status(404).send('Not Found'); }
    hashtag.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}