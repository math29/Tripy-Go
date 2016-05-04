'use strict';

var _ = require('lodash');
var TransportComparator = require('./transportComparator.model');

// Get list of transport comparator
exports.index = function(req, res) {
  TransportComparator.find(function (err, comparators) {
        if(err) { return handleError(res, err); }
        populate(comparators, req, res);
      });
};

// Get a single transport comparator
exports.show = function(req, res) {
  TransportComparator.findById(req.params.id, function (err, transport) {
    if(err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    populate(transport, req, res);
    //return res.json(transport);
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
  // Recherche du comparateur pour vérifier qu'il éxiste
  TransportComparator.findById(req.params.id, function (err, transport) {
    // Gestion des erreurs
    if (err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    // merge de l'ancien et du nouveau comparateur
    //var updated = _.merge(transport, req.body);
    if(req.body.type){
      transport.type = req.body.type;
    }
    if(req.body.company){
      transport.company = req.body.company;
    }
    // On sauvegarde le nouveau comparateur
    transport.save(function (err) {
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

/**
 * Populate the comparator with company and transport types
 *
 * @param doc: document to Populate
 * @param req: HTTP request
 * @param res: HTTP response
 *
 */
function populate(doc, req, res){
  TransportComparator.populate(doc, [
      {path:'company', ref:'Company'},
      {path:'type', ref:'TransportType'},
      {path: 'ergo_rate', ref: 'Rate'},
      {path: 'content_rate', ref: 'Rate'},
      {path: 'comments.user', ref: 'User', select:'-salt -hashedPassword -email -provider'},
      {path: 'comments.rate', ref: 'Rate'}
    ], function(err, result){
      if(err)console.err(err);

      return res.status(200).json(result);
    });
}

function handleError(res, err) {
  if(err.code === 11000){
    var error = {error: 'Ce comparateur existe déjà'};
      return res.status(500).json(error);
  }

  return res.status(500).json({error: err.toString()});
}
