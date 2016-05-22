'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var TransportComparator = require('./comparators.model');
var Rate = require('../rate/rate.model');
var mongoose = require('mongoose');

// Get list of transport comparator
exports.index = function(req, res) {
  TransportComparator.find(function (err, comparators) {
        if(err) { return handleError(res, err); }
        populate(comparators, req, res);
      });
};

// Get a single transport comparator
exports.show = function(req, res, next) {
  console.log('HERE');
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log('redirect');
    next();
  } else {
    TransportComparator.findById(req.params.id, function (err, transport) {
      if(err) { return handleError(res, err); }
      if(!transport) { return res.status(404).send('Not Found'); }
      populate(transport, req, res);
      //return res.json(transport);
    });
  }
};
// get comparator by type
exports.findByType = function(req, res) {
  console.log('HERE 1');
  TransportComparator.find( {types: {$in: [req.params.id]} }, function (err, transport) {
    if(err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    populate(transport, req, res);
  });
};

exports.getComments = function(req, res) {
  TransportComparator.findOne({_id: req.params.id, types: {$in: [req.params.type]}}, function (err, transport) {
    if(err) { return handleError(res, err); }
    if(!transport) { return res.status(404).send('Not Found'); }
    filterComments(transport, req, res);
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
      {path:'transport.types', ref:'TransportType'},
      {path: 'transport.ergo_rate', ref: 'Rate'},
      {path: 'transport.content_rate', ref: 'Rate'},
      {path: 'transport.comments.user', ref: 'User', select:'-salt -hashedPassword -email -provider'},
      {path: 'transport.comments.rate', ref: 'Rate'}
    ], function(err, result){
      if(err)logger.err(err);
      return res.status(200).json(result);
    });
}

function compareCommentsDESC(a, b){
    if(a.rate.score < b.rate.score)
      return 1;
    else if(a.rate.score > b.rate.score)
      return -1;
    else
      return 0;
}

function filterComments(doc, req, res){
  var limit = req.params.limit;
  var offset = req.params.offset;

  if(!limit) { return res.status(404).send('No limit given'); }
  if(!offset) { return res.status(404).send('No Offset given'); }

  TransportComparator.populate(doc, [
      {path: req.params.type + '.comments.user', ref: 'User', select:'-salt -hashedPassword -email -provider'},
      {path: req.params.type + '.comments.rate', ref: 'Rate'}
    ], function(err, result){
      if(err)logger.err(err);

      // On récupère seulement les commentaires du comparator
      var comments = result[req.params.type].comments;

      // Puis on les tris dans l'ordre descendant
      comments.sort(compareCommentsDESC);

      // On applique les limit et offset
      var selected_comments = comments.splice(offset, limit);

      return res.status(200).json(selected_comments);
    });
}

function handleError(res, err) {
  if(err.code === 11000){
    var error = {error: 'Ce comparateur existe déjà'};
      return res.status(500).json(error);
  }

  return res.status(500).json({error: err.toString()});
}
