'use strict';

var Promo = require('./promo.model.js');
var logger = require('../../config/logger');
var TypeChecker = require('../../utils/checkObjects');
var mongoose = require('mongoose');
var _ = require('lodash');

/**
 * Get list of promos
 * restriction: 'no'
 */
exports.index = function(req, res) {
  Promo.find({active: true})
    .skip(req.query.page || 0)
    .limit(req.query.limit || 15).exec(function (err, promos) {
    if(err) {
      logger.error("Could not find promos");
      return res.status(400).send(err);
    }
    res.status(200).json(promos);
  });
};

exports.create = function(req, res) {
  let body = req.body;
  if(body.type && body.url && body.vendor && body.discount && body.initial_price && body.img && body.end_date) {
    let promo = new Promo(body);
    promo.save( function(err, doc) {
        if(err) {
          return res.status(400).json({ 'error': err});
        }
        else {
          return res.status(201).json( { 'ok': 'La promo à été créée'});
        }
    });
  }else {
    return res.status(400).json({ 'error': 'Il manque des données'});

  }
}
/**
 * Deletes a promo
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Promo.update({_id: req.params.id}, {$set: {"active": false, "archived": true}}, function(err, promo) {
    if(err) {
      logger.error('Could not archive promo');
      return res.status(500).send(err);
    }
    return res.status(204).send('No Content');
  });
};
