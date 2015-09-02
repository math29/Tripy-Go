'use strict';

var _ = require('lodash');
var Travel = require('./travel.model');

// Get list of travels
exports.index = function(req, res) {
  Travel.find(function (err, travels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(travels);
  });
};

// Get a single travel
exports.show = function(req, res) {
  Travel.findById(req.params.id, function (err, travel) {
    if(err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    return res.json(travel);
  });
};

// Creates a new travel in the DB.
exports.create = function(req, res) {
  // don't include the date_created, if a user specified it
  delete req.body.date_created;
  Travel.create(req.body, function(err, travel) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(travel);
  });
};

// Updates an existing travel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Travel.findById(req.params.id, function (err, travel) {
    if (err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    var updated = _.merge(travel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(travel);
    });
  });
};

// Deletes a travel from the DB.
exports.destroy = function(req, res) {
  Travel.findById(req.params.id, function (err, travel) {
    if(err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    travel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}