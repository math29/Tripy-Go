'use strict';

var Rate = require('./rate.model.js');
var logger = require('../../config/logger');
var TypeChecker = require('../../utils/checkObjects');
var mongoose = require('mongoose');

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
    if(rate.type === 'Stars'){
      console.log('Id: '+rateId);
      Rate.aggregate(
        [
          {$match: {_id: mongoose.Types.ObjectId(rateId)}}
          ,
          {$unwind: '$raters'},
          {$group: {
            '_id': '$raters.action',
            'count':{$sum: 1}
          }},
          {$sort: {'_id':-1}},
          {
            $group: {
              '_id':rateId,
              'stars': {$push: {'value': '$count', 'star': '$_id'}},
              'count':{$sum: '$count'}
            }
          }
        ], function(err, result){
          if(err) return res.status(500).send(err);

          res.json(transformStarResult(result[0]));
        }
      );
    }else{
      res.json(rate);

    }
  });
};

function transformStarResult(result){
  var classes = ["danger","warning","info","success","success"]
  var stars = new Array();
  var sum = 0;
  for(var i = 0; i < result.stars.length; i++){
    sum += result.stars[i].value * result.stars[i].star;
    result.stars[i].value = convertToPercent(result.stars[i].value, result.count);
    stars[result.stars[i].star-1] = result.stars[i];
  }
  for(var j = 0; j < 5; j++){
    if(!stars[j]){
      stars[j] = getEmptyStar(j+1);
    }
    stars[j].class = classes[j];
  }
  result.score = Math.round(sum / result.count);
  result.stars = stars.reverse();
  return result;

}

function getEmptyStar(value){
  return {"value":0,"star":value};
}

function convertToPercent(value, count){
  return (100.0 * value)/count;
}

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
  var userId = req.user._id;
  var side = req.params.side;
  var sideValue = 1;
  var rateType = "Stack";
  if(TypeChecker.isNumber(side)){
      logger.info("Is Number, use stars");
      sideValue = side;
      rateType = "Stars";
  }else{
    if(side === 'down'){
      sideValue = -1;
    }
  }
  var rateOb = {user: userId, action: sideValue};

  Rate.findOneAndUpdate({_id: rateId, type: rateType, "raters.user" : {$nin: [userId]}},{$push:{raters: rateOb}, $inc:{score: sideValue}},function(err, result){
    if(err){
      logger.error(err);
      return res.status(500).json('{error:\'Unable to find rate\'}');
    }
    return res.status(200).json(result);
  });
}
