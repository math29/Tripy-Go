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
              'stars': {$push: {'count': '$count', 'value': '$_id'}},
              'count':{$sum: '$count'}
            }
          }
        ], function(err, result){
          if(err) return res.status(500).send(err);
          console.log('result: '+result + 'err: '+err);
          res.json(result);
        }
      );
    }else{
      res.json(rate);

    }
  });

  /*db.getCollection('rates').aggregate([
    {$match:{'_id':ObjectId("56e9504f47b2f14db28a3363")}},
    {$unwind: "$raters"},
    {$group: {
        "_id":"$raters.action",
        "count":{$sum:1}
        }
    },
    {
        $sort: {_id:-1}
    },
    {
        $group:{
            _id:"0",
            "stars":{$push:{"count": "$count", "value":"$_id"}},
            "count":{$sum:"$count"},
            }

     }]
   )*/
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
