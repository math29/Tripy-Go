'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Operation = require('./operation.model');
var Timeline = require('../timeline/timeline.model');
var Rate = require('../rate/rate.model');
var TAG = "OperationController";

/**
 * Get list of operations
 *
 * @param req request
 * @param res response
 */
exports.index = function(req, res) {
  Operation.find()
  .sort({_id:1})
  .exec(
    function (err, operations) {
      // vérifie que la requête mongo n'à pas échoué
      if(err) {
        logger.error('%s: Can\'t index operations', TAG);
        return handleError(res, err);
      }

    return res.status(200).json(operations);
  });
};

/* Create an operation */
exports.create = function(req, res){
  /* Get parameters */
  var titre = req.params.title;
  var content = req.body.content;
  var steps = req.body.steps;
  if(steps === undefined){
    steps = [];
  }
  var operation = {type:'advice', title: titre, content: content, steps: steps};
  var timelines = [];
  /* check that object is complete*/
  var errors = checkOperationObject(operation);

  /* if there isn't any error, we can start create it */
  if(errors.errors.length === 0){
    // create a new rate
    var rate = new Rate({score:0, raters:[]});

    /* save the rate in database*/
    rate.save(function(err, saved){
      if(err){
        logger.error('can\'t create rate');
        return res.status(500).json('{error:"can\'t create rate"}');
      }
      /* set rate id in operation */
      operation.rate = saved._id;

      /* save operation */
      var mongoperation = new Operation(operation);
      mongoperation.save(function(err, op){
        /* if there is an error, delete  created rate */
        if(err){
          logger.error('can\'t create operation');
          rate.remove(function(err, op){
            if(err){
              logger.error(err);
            }
          });
          return res.status(500).json('{error:"can\'t create operation: '+err+'"}');
        }
        op.rate.score = 0;
        op.rate.raters = [];
        if(operation.steps.length > 0 ){
          var stepsIds = [];
          for(var i = 0; i < operation.steps.length; i++){
            stepsIds.push(operation.steps[i].id);
          }
          Timeline.update({_id: {$in: stepsIds}}, {$push: {operations: op._id}}, function(err, data){
            if(err){
              return res.status(400).json('{error:\'Unable to add operation to timeline\'}');
            }
            return res.status(201).json(op);
          });

        }else{
          return res.status(201).json(op);
        }
      });
    });
  }else{
    return res.status(400).json(errors);
  }
}

exports.update = function(req, res){
  var operation = {_id: req.params.id, title: req.params.title, content: req.body.content, steps: req.body.steps}
  var mongoPeration = new Operation(operation);
  Operation.findOneAndUpdate({_id:req.params.id}, operation, function(err, update){
    if(err){
      logger.error(err);
      return res.status(500).json('{error:"error"}');
    }
    logger.debug(update);
    return res.status(200).json(update);
  });
}

// Get a single operation
exports.show = function(req, res) {
  Operation.findById(req.params.id, function (err, operation) {
    if(err) {
     return handleError(res, err);
    }
    if(!operation) {
      logger.warn('%s: Could not found operation with id: '+req.params.id, TAG);
      return res.status(404).send('Not Found');
    }
    return res.json(operation);
  });
};

exports.destroy = function(req, res) {
  Operation.findOneAndRemove({_id: req.params.id}, function(err, operation){
    if(err){
      return handleError(res, err);
    }
    operation.remove();
    return res.status(204).json('{success: \'No content\'}');

  });
};

/**
 * Vérifie que l'objet log comporte tous les attributs nécessaire
 */
function checkOperationObject(operation){
	var errors = {};
	errors.errors = [];

	if(!isDefined(operation.type)){
  	errors.errors.push("Il manque le type d'opération");
  }
  if(!isDefined(operation.title)){
  	errors.errors.push("Il manque le titre de l'opération");
  }
  if(!isDefined(operation.content)){
  	errors.errors.push("Il manque le contenu de l'opération");
  }
  return errors;
}

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
  logger.error(err);
  return res.status(500).send(err);
}
