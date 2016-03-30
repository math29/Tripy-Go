'use strict';

var _ = require('lodash');
var Location = require('./location.model');

// Get list of locations
exports.index = function(req, res) {
  Location.find(function (err, locations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(locations);
  });
};

// Get a single location
exports.show = function(req, res) {
  Location.findById(req.params.id, function (err, location) {
    if(err) { return handleError(res, err); }
    if(!location) { return res.status(404).send('Not Found'); }
    return res.json(location);
  });
};

// Get a single location by name
exports.showByName = function(req, res) {
  Location.find({"name": req.params.name}, function (err, location) {
    if(err) { return handleError(res, err); }
    return res.json(location);
  });
};

// Creates a new location in the DB.
exports.create = function(req, res) {
  Location.create(req.body, function(err, location) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(location);
  });
};

// Updates an existing location in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Location.findById(req.params.id, function (err, location) {
    if (err) { return handleError(res, err); }
    if(!location) { return res.status(404).send('Not Found'); }
    var updated = _.merge(location, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(location);
    });
  });
};

// Deletes a location from the DB.
exports.destroy = function(req, res) {
  Location.findById(req.params.id, function (err, location) {
    if(err) { return handleError(res, err); }
    if(!location) { return res.status(404).send('Not Found'); }
    location.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Example finding location using mongoose location system : Searching locations arround another location
exports.findLocation = function(req, res, next) {
  var limit = req.params.limit || 10;

  // get the max distance or set it to 8 kilometers
  var maxDistance = req.params.distance || 8;

  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;

  // get coordinates [ <longitude> , <latitude> ]
  var coords = [];
  coords[0] = req.params.longitude;
  coords[1] = req.params.latitude;

  // find a location
  Location.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
    }
  }).limit(limit).exec(function(err, locations) {
    if (err) {
      return res.json(500, err);
    }

    return res.json(200, locations);
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}