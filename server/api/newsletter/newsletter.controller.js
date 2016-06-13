'use strict';

var _ = require('lodash');
var Subscriber = require('./newsletter.model');
var logger = require('../../config/logger.js');

var TAG = "NewsletterController";


// Creates a new country in the DB.
exports.create = function(req, res) {
  var userMail = req.body.mail;
  var subscriber = new Subscriber({email: userMail});

  subscriber.save(function(err, doc) {
    if(err) {
      if(err.code == 11000) {
        return res.status(401).json({status: 401, data: 'User already exist'});
      } else {
        return res.status(400).json({status: 400, data: 'Unable to save subscriber'});
      }
    }
    return res.status(201).json({stauts: 201, data: 'Successfully subscribe'});
  });


};

/**
 * Vérifie si un paramétre est défini ou non vide
 *
 * @param parameter variable a vérifier
 * @return true si la variable est définie et non nulle, false sinon
 */
function isDefined(parameter){
  return (undefined !== parameter && parameter !== "");
}

function handleError(res, err) {
  return res.status(500).send(err);
}
