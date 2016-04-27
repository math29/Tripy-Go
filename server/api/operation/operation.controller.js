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
  .populate('rate')
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
  /* check that object is complete*/
  var errors = checkOperationObject(operation);

  /* if there isn't any error, we can start create it */
  if(errors.errors.length === 0){
    /* save operation */
    var mongoperation = new Operation(operation);
    mongoperation.save(function(err, op){
      /* if there is an error, delete  created rate */
      if(err){
        logger.error('can\'t create operation');
        return res.status(500).json('{error:"can\'t create operation: '+err+'"}');
      }

      return res.status(201).json(op);
    });
  }else{
    return res.status(400).json(errors);
  }
};

/**
 * Update an operation and the timelines associated
 */
exports.update = function(req, res){
  var operation = {_id: req.params.id, title: req.params.title, content: req.body.content, steps: req.body.steps};
  Operation.findOneAndUpdate({_id:req.params.id}, operation, function(err, update){

    if(err){
      logger.error(err);
      return res.status(500).json('{error:"error"}');
    }
    // si il n'y à pas le même nombre de steps entre l'obbjet de base et l'objet mis à jour
    if(update.steps.length !== operation.steps.length){
      var diffSteps = findDifferentSteps(update.steps, operation.steps);
      for(var i=0; i<diffSteps.length; i++){
        if(findIndexInArray(diffSteps[i], update.steps) !== -1){
          removeOperationFromTimeline(diffSteps[i], update);
        }else{
          addOperationToTimeline(diffSteps[i], update._id);

        }
      }
    }
    return res.status(200).json(update);
  });
};

/**
 * Remove an operation from timeline
 */
function removeOperationFromTimeline(timelineId, operation){
  Timeline.findOneAndUpdate({_id:timelineId, operations:{$in: [operation._id]}},{$pull:{operations: operation._id}}, function(err, test){
    if(err){
      logger.error(err);
    }

    // on décrémente l'ensemble des opérations qui suivent celle que l'on supprime de la timeline
    for(var i = 0; i < operation.steps.length; i++){
      if(operation.steps[i].id === timelineId){
        Operation.update({"steps.id":timelineId, "steps.step": {$gt: operation.steps[i].step}},{$inc:{"steps.$.step":-1}},{multi: true}).exec();
      }
    }

    logger.debug(test);
  });
}

/**
 * Add an operation to timeline Object
 */
function addOperationToTimeline(timelineId, operationId){
  Timeline.findOneAndUpdate({_id:timelineId, operations:{$nin: [operationId]}},{$push:{operations: operationId}}, function(err, test){
    if(err){
      logger.error(err);
    }
    logger.debug(test);
  });
}

function findIndexInArray(id, array){
  for(var i = 0; i< array.length; i++){
    if(array[i].id === id){
      return i;
    }
  }
  return -1;
}

/**
 * Function which returns the result of the subtraction method applied to
 * sets (mathematical concept).
 *
 * @param a Array one
 * @param b Array two
 * @return An array containing the result
 */
function findDifferentSteps(a, b) {
  var cla1 = [];
  var cla2 = [];
  for(var i = 0; i<a.length; i++){
    cla1.push(a[i].id);
  }
  for(var j = 0; j<b.length; j++){
    cla2.push(b[j].id);
  }
  return sym(cla1, cla2);
}

function sym() {

  // Convert the argument object into a proper array
  var args = Array.prototype.slice.call(arguments);

  // Return the symmetric difference of 2 arrays
  var getDiff = function(arr1, arr2) {

    // Returns items in arr1 that don't exist in arr2
    function filterFunction(arr1, arr2) {
      return arr1.filter(function(item) {
        return arr2.indexOf(item) === -1;
      });
    }

    // Run filter function on each array against the other
    return filterFunction(arr1, arr2)
      .concat(filterFunction(arr2, arr1));//NOSONAR
  };

  // Reduce all arguments getting the difference of them
  return args.reduce(getDiff, []);
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


/**
 * Removed specified operation from database
 */
exports.destroy = function(req, res) {
  Operation.findOne({_id: req.params.id}, function(err, operation){
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
