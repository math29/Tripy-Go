'use strict';

var Promo = require('./promo.model.js');
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
  Promo.find({active: true})
    .limit(req.query.limit || 15).exec(function (err, promos) {
    if(err) {
      logger.error("Could not find promos");
      return res.status(400).send(err);
    }
    res.status(200).json(promos);
  });
};

exports.notifyFb = function(req, res) {
  if(process.env.NODE_ENV == 'production') {
    Facebook.find({}, function(err, doc) {
      if(err) {
        console.log(err);
        return res.status(400).json({'error':'facebook can\'t be notified'});
      }else {
        console.log(doc);
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
            console.log(chunk)
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
    console.log('Messenger platform message will not be send, it could be take as a spam');
    return res.status(200).json({'ok':'facebook would be notified in production'});

  }
}

exports.create = function(req, res) {
  var body = req.body;
  if(body.type && body.url && body.vendor && body.discount && body.initial_price && body.img && body.end_date) {
    body.clicks = {anonymous: 0, connected: []};
    var promo = new Promo(body);
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

exports.update = function(req, res) {
  var body = req.body;
  var update_obj = {};
  for(var k in body) {
    update_obj[k] = body[k];
  }

  Promo.update({_id: req.params.id}, {"$set": update_obj}, function(err, updat) {
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
  Promo.update({_id: req.params.id}, {$set: {"active": false, "archived": true}}, function(err, promo) {
    if(err) {
      logger.error('Could not archive promo');
      return res.status(500).send(err);
    }
    return res.status(204).send('No Content');
  });
};

exports.show = function(req, res, next) {
  var promoId = req.params.id;
  if(req.headers.authorization) {
    return res.redirect('connected/'+promoId);
  }
  Promo.findOneAndUpdate({_id: promoId}, {"$inc": {"clicks.anonymous": 1}}, function(err, find) {
    if(err) {
      console.log(err);
      return res.redirect('../../index.html');
    }else {
      return res.redirect(find.url);
    }
  });
}

exports.showConnected = function(req, res, next) {
  var promoId = req.params.id;

  Promo.findOneAndUpdate({_id: promoId}, {"$push": {"clicks.connected": req.user._id}}, function(err, find) {
    if(err) {
      console.log(err);
      return res.redirect('../../index.html');
    }else {
      return res.redirect(find.url);
    }
  });
}
