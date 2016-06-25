'use strict';

var _ = require('lodash');
var TransportType = require('./transportType.model');

/**
 * Get list of transportsType
 *
 * @param req: requête http
 * @param res: réponse http
 *
 */
exports.index = function(req, res) {
  TransportType.find(function (err, transportType) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(transportType);
  });
};

/**
 * Get a single transportType
 *
 * @param req: requête http
 * @param res: réponse http
 */
exports.show = function(req, res) {
  TransportType.findById(req.params.id, function (err, transportType) {
    if(err) { return handleError(res, err); }
    if(!transportType) { return res.status(404).send('Not Found'); }
    return res.json(transportType);
  });
};

/**
 * Creates a new transportType in the DB.
 *
 * @param req: reuqête http
 * @param res: réponse http
 *
 */
exports.create = function(req, res) {
  if(req.params.name && req.body.img){
    var transportType = new TransportType({name:req.params.name, img:req.body.img});
    transportType.save(function(err){
      if(err){
        return handleError(res, err);
      }
      return res.status(201).json(transportType);
    });
  }else{
    return res.status(400).json({"error":"Parameter is missing"});
  }


};

/**
 * Updates an existing transport in the DB.
 *
 * @param req: requête Http
 * @param res: réponse Http
 *
 */
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TransportType.findById(req.params.id, function (err, transport) {
    if (err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(transport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transport);
    });
  });
};

/**
 * Deletes a transport from the DB.
 *
 * @param req: requête Http
 * @param res: réponse Http
 *
 */
exports.destroy = function(req, res) {
  TransportType.findById(req.params.id, function (err, transport) {
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
