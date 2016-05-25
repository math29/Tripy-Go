'use strict';

var _ = require('lodash');
var Travel = require('./travel.model');
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
  Travel.findById(req.params.id)
    .deepPopulate('creator transports.arrival.country transport.departure.country', function (err, travel) {
    if(err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    return res.json(travel);
  });
};

exports.get_by_user_id = function(req, res) {
  User.findById(req.params.id, function(err, user){
    Travel.find({'_id':{$in: user.travels}},
      function (err, travels) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(travels);
      });
  });
};


var save_travel = function(req, res) {
  delete req.body.date_created;
  req.body.author = req.user._id;
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
  save_travel(req, res);
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
