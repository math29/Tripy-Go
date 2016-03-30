'use strict';

var _ = require('lodash');
var TransportComparator = require('./transportComparator.model');

// Get list of transport comparator
exports.index = function(req, res) {
  TransportComparator.find(function (err, transports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(transports);
  });
};

// Get a single transport comparator
exports.show = function(req, res) {
  TransportComparator.findById(req.params.id, function (err, transport) {
    if(err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    return res.json(transport);
  });
};

// Creates a new transport comparator in the DB.
exports.create = function(req, res) {
  TransportComparator.create(req.body, function(err, transport) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(transport);
  });
};

// Updates an existing transport comparator in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TransportComparator.findById(req.params.id, function (err, transport) {
    if (err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(transport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transport);
    });
  });
};

// Deletes a transport comparator from the DB.
exports.destroy = function(req, res) {
  TransportComparator.findById(req.params.id, function (err, transport) {
    if(err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    transport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
