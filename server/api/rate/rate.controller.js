'use strict';

var Rate = require('./rate.model.js');
var logger = require('../../config/logger');


/**
 * Get list of rates
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Rate.find().exec(function (err, rates) {
    if(err) {
      logger.error("Could not find rates");
      return res.status(500).send(err);
    }
    res.status(200).json(rates);
  });
};


/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var rateId = req.params.id;

  Rate.findById(rateId, function (err, rate, next) {
    if (err) {
      logger.error("Could not retrieve rate", rate);
      return next(err);
    }
    if (!rate) return res.status(401).send('Unauthorized');
    res.json(rate);
  });
};

/**
 * Deletes a rate
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Rate.findByIdAndRemove(req.params.id, function(err, rate) {
    if(err) {
      logger.error('Could not delete rate', rate);
      return res.status(500).send(err);
    }
    return res.status(204).send('No Content');
  });
};

exports.vote = function(req, res){
  var rateId = req.params.id;
  var userId = req.params.uId;
  Rate.findById(rateId, function(err, rate){
    if(err){
      logger.error('Could not find rate', rate);
      return res.status(500).send(err);
    }
    var userVotedLength = rate.raters.length;
    console.log(userId);
    for(var i=0; i < userVotedLength; i++){
      console.log(rate.raters[i]+' '+userId);
    }
    return res.status(200).json({'success': 'OK'});
  });
}
