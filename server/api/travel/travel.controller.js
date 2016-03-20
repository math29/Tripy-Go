'use strict';

var _ = require('lodash');
var Travel = require('./travel.model');
var Loc = require('../location/location.model');
var User = require('../user/user.model');

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


var save_travel = function(req, res) {
  delete req.body.date_created;
  Travel.create(req.body, function(err, travel) {
    if(err) { return handleError(res, err); }
    if(travel.author){
      User.update(
        {_id: travel.author},
        { $push: {travels: travel}},
        function(err, affected, resp) {
        })
    }
    return res.status(201).json(travel);
  });
};

// Creates a new travel in the DB.
exports.create = function(req, res) {
  var nbAsyncRequests = 0;
  // don't include the date_created, if a user specified it
  if(req.body.arrival){
    nbAsyncRequests++;
    // Create Location given in Post Request
    Loc.create(req.body.arrival, function(err, arrival_loc) {
      if(err) { return handleError(res, err); }
      req.body.arrival = arrival_loc;
      nbAsyncRequests--;
      if(!nbAsyncRequests) save_travel(req, res);
    });
  }
  if(req.body.departure){
    nbAsyncRequests++;
    Loc.create(req.body.departure, function(err, departure_loc) {
      if(err) { return handleError(res, err); }
      req.body.departure = departure_loc;
      nbAsyncRequests--;
      if(!nbAsyncRequests) save_travel(req, res);
    });
  }
  if(!nbAsyncRequests){
    save_travel(req, res);
  }
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