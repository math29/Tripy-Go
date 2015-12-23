'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Timeline = require('./timeline.model');
var Operation = require('../operation/operation.model');
var TAG = "TimelineController";

// récupére la liste de toutes les timelines
exports.index = function(req, res){
  // récupére toutes les timelines et remplis les documents à l'intérieur
  Timeline.find({}).populate('operations').exec(function(err, timelines){
    if(err){
      logger.error('Unable to get timelines');
      return res.status(400).json('{error: \'Unable to get timelines\'}');
    }
    // remplis les votes pour chaque opération
    var options = {path:'operations.rate', model:'Rate'};
    Timeline.populate(timelines, options, function(err, result){
        if(err){
          return res.status(400).json('{errors:\'error\'}');
        }
        return res.status(200).json(result);

    });
  });
}


// permet de créer une timeline
exports.create = function(req, res){
  var timeline = {name: req.params.name, description: req.body.description, operations:[]}
  var errors = checkTimelineObject(timeline);
  if(errors.errors.length === 0){
    var mongoTimeline = new Timeline(timeline);
    mongoTimeline.save(function(err, timeline){
      if(err){
        logger.error('Unable to create timeline', err);
        return res.status(400).json('{error:\'Unable to create timeline\'}');
      }
      return res.status(201).json(timeline);
    });
  }else{
    logger.error('Missing values when created a new timeline')
    return res.status(400).json(errors);
  }
}

// ajoute une opération à une timeline
exports.addOperation = function(req, res){
  var operationId = req.params.operationId;
  var timelineId = req.params.timelineId;
  Operation.findOne({_id: operationId}, function(err, data){
      if(err){
        logger.error('L\'opération demandée n\'existe pas');
        return res.status(400).json('{error:\'Unable to find operation\'}');
      }else{
        Timeline.findOneAndUpdate({_id:timelineId, operations:{$nin: [operationId]}},{$push:{operations: operationId}},{safe: true, upsert: false}, function(err, doc){
          if(err){
            return res.status(400).send('ERROR');
          }
          if(doc == null){
            return res.status(418).json('{error:\'Operation is already in timeline or timeline does not exist\'}');
          }else{
            Operation.findOneAndUpdate({_id: operationId}, {$push:{steps: {step: doc.operations.length, timeline: timelineId}}},function(err, ope){
              if(err){
                logger.error(err);
                return res.status(400).json('{error: \'Unable to add timeline to operation\'}');
              }
              return res.status(202).json(doc);
            });
            doc.operations.push(operationId);
            return res.status(202).json(doc);
          }
        });
      }
    });
}

// supprime une opération de la timeline
exports.removeOperation = function(req, res){
  var operationId = req.params.operationId;
  var timelineId = req.params.timelineId;
  logger.debug('timelineId: '+timelineId+' operationId: '+operationId);
  Timeline.findOneAndUpdate({_id:timelineId},{$pull:{operations: {$in : [operationId]}}}).populate('operations').populate('operations.rate').exec(function(err, doc){
    if(err){
      logger.error(err);
      return res.status(400).send('ERROR');
    }
    if(doc == null){
      return res.status(418).json('{error:\'Operation is already in timeline or timeline does not exist\'}');
    }else{
      // remove opération from list
      doc.operations.splice(findOperationInList(operationId,doc.operations),1);
      return res.status(202).json(doc);

    }
  });

}

// récupére une timeline
exports.show = function(req, res){
  Timeline.findOne({_id: req.params.id}).populate('operations').populate('operations.root').exec(function(err, timeline){
    if(err){
      logger.error('La Timeline '+req.params.id+' est introuvable');
      return res.status(400).json('{error:\'Timeline introuvable\'}');
    }

    Timeline.populate(timeline, {path:'operations.rate', model:'Rate'}, function(err, result){
      if(err){
        logger.error('Impossible de remplir les votes');
        return res.status(400).json('{error: \'Impossible de récupérer le vote associé\'}');
      }

      return res.status(200).json(result);
    });

  });
}

exports.destroy = function(req, res){
  return res.status(200).send();
}


/**
 * Vérifie que l'objet log comporte tous les attributs nécessaire
 */
function checkTimelineObject(timeline){
	var errors = {};
	errors.errors = [];

	if(!isDefined(timeline.name)){
  	errors.errors.push("Il manque le nom de la timeline");
  }

  return errors;
}


/**
 * Find an operation in a list via the id
 * return the index if exist, -1 else
 *
 * @param operationId id of opération to find
 * @param list list in which you want to search opération
 * @return index
 */
function findOperationInList(operationId, list){
  for(var i=0; i<list.length; i++){
    if(list[i]._id === operationId){
      return i;
    }
  }
  return -1;
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
