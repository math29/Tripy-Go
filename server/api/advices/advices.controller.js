'use strict';

var Advice = require('./advices.model.js');
var logger = require('../../config/logger');
var TypeChecker = require('../../utils/checkObjects');
var mongoose = require('mongoose');
var _ = require('lodash');
var http = require('https');
var Facebook = require('../facebook_platform/facebook.model');

/**
 * Get list of promos
 * restriction: 'no'
 */
exports.index = function(req, res) {
  Advice.find({})
    .limit(req.query.limit || 15).exec(function (err, advices) {
    if(err) {
      logger.error("Could not find advices");
      return res.status(400).send(err);
    }
    res.status(200).json(advices);
  });
};

exports.notifyFb = function(req, res) {
  if(process.env.NODE_ENV === 'production') {
    Facebook.find({}, function(err, doc) {
      if(err) {
        return res.status(400).json({'error':'facebook can\'t be notified'});
      }else {
        var tr_req = http.request({
          host: 'yoann-diquelou.fr',
          port: '8082',
          path: '/tripy',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }, function(resp) {
          resp.on('data', function(chunk){
          }).on("error", function(e){
          console.log("Got error: " + e.message);
        });
      });
      tr_req.write(JSON.stringify({"dest": doc}));
      tr_req.end();
      return res.status(200).json({'ok':'facebook was notified'});
      }
    });
  }else {
    return res.status(200).json({'ok':'facebook would be notified in production'});

  }
}

exports.create = function(req, res) {
  var body = req.body;
  if(body.title && body.img && body.description) {
    var advice = new Advice(body);
    advice.save( function(err, doc) {
        if(err) {
          return res.status(400).json({ 'error': err});
        }
        else {
          return res.status(201).json( { 'ok': 'Le conseil à été créée'});
        }
    });
  }else {
    return res.status(400).json({ 'error': 'Il manque des données'});

  }
}

exports.update = function(req, res) {
  var body = req.body;
  var update_obj = {};
  for(var k in body) {
    update_obj[k] = body[k];
  }

  Advice.update({_id: req.params.id}, {"$set": update_obj}, function(err, updat) {
    if(err) {
      return res.status(400).json({ 'error': 'Impossible de mettre à jour la promotion'});
    }
    else {
      return res.status(200).json(updat);
    }
  })
}
/**
 * Deletes a promo
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Advice.delete({_id: req.params.id}, function(err, promo) {
    if(err) {
      logger.error('Could not delete advices');
      return res.status(500).send(err);
    }
    return res.status(204).send('No Content');
  });
};
