'use strict';

var Rate = require('./rate.model.js');
var logger = require('../../config/logger');
var TypeChecker = require('../../utils/checkObjects');
var mongoose = require('mongoose');
var _ = require('lodash');

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

exports.findById = function (req, res, next) {
  var rateId = req.params.id;

  Rate.findById(rateId, function (err, rate, next) {
    if (err) {
      logger.error("Could not retrieve rate", rate);

      return next(err);
    }
    if (!rate){
      return res.status(204).send('No Content');
    }
    if(rate.type === 'Stars'){
      if(rate.raters.length > 0){
        Rate.aggregate(
          [
            {$match: {_id: mongoose.Types.ObjectId(rateId)}},
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
            if(result.length > 0){
              return res.json(transformStarResult(result[0]));
            }
            return res.json({'error':'fail'});
          });
      }
      return res.status(200).json(rate);

    }else{
      return res.status(200).json(rate);
    }
  });
};

// récupére mon vote pour un vote donné
exports.myRate = function(req, res) {
  Rate.findById(req.params.rateId, function(err, rate) {
    if(err) {
      return res.status(400).json({status: 400, data: 'Error while retrieving rate'});
    }
    if(rate == null){
      return res.status(404).json({status: 404, data:'Le vote n\'existe pas'});
    }
    var myRat = _.find(rate.raters, function(o){
      console.log(JSON.stringify(o) + ' my Id: '+ req.user._id);
      return o.user == String(req.user._id)});
    if(myRat) {
      return res.status(200).json({status: 200, data: myRat});
    }else {
      return res.status(204).json({status: 204, data: 'You haven\'t rate'});
    }
  });
};

function transformStarResult(result){
  var classes = ["danger","warning","info","success","success"]
  var stars = [];
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
  Rate.findOne({_id: rateId, type: rateType}, function(err, result){
    if(err){
      logger.error(err);
      return res.status(500).json('{error:\'Unable to find rate\'}');
    }
    if(!result){
      return res.status(204).json({'error': 'No content'});
    }
    var userVote = _.findIndex(result.raters, function(o){
      return String(o.user) == String(userId);});
    if(userVote == -1){
      result.raters.push(rateOb);
      result.score += sideValue;
      result.save();
    }else{
      if(rateOb.action != result.raters[userVote].action){
        var score_difference = Number(rateOb.action) - Number(result.raters[userVote].action);

        Rate.update({_id: rateId, type: rateType, "raters.user": rateOb.user},
          {$set:
            {"raters.$.action": rateOb.action}, $inc:{"score": score_difference}}, function(){});
        result.raters[userVote] = rateOb;
        result.score += score_difference;
      }



    }
    return res.status(200).json(result);
  });
  /*
  Rate.findOneAndUpdate({_id: rateId, type: rateType, "raters.user" : {$nin: [userId]}},{$push:{raters: rateOb}, $inc:{score: sideValue}},function(err, result){
    if(err){
      logger.error(err);
      return res.status(500).json('{error:\'Unable to find rate\'}');
    }
    return res.status(200).json(result);
  });*/
}
