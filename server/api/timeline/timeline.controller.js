'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Timeline = require('./timeline.model');
var Operation = require('../operation/operation.model');
var TAG = "TimelineController";

exports.index = function(req, res){
  return res.status(200).send();
}

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

exports.addOperation = function(req, res){
  var operationId = req.params.operationId;
  var timelineId = req.params.timelineId;
  Operation.findOne({_id: operationId}, function(err, data){
      if(err){
        console.log('operation not defined');
        return res.status(400).json('{error:\'Unable to find operation\'}');
      }else{
        Timeline.findOneAndUpdate({_id:timelineId, operations:{$nin: [operationId]}},{$push:{operations: operationId}},{safe: true, upsert: false}, function(err, doc){
          if(err){
            console.log(err);
            return res.status(400).send('ERROR');
          }
          console.log(doc);
          if(doc == null){
            return res.status(418).json('{error:\'Operation is already in timeline or timeline does not exist\'}');
          }else{
            doc.operations.push(operationId);
            return res.status(202).json(doc);
          }
        });
      }
    });
}

exports.removeOperation = function(req, res){
  var operationId = req.params.operationId;
  var timelineId = req.params.timelineId;

  Timeline.findOneAndUpdate({_id:timelineId, operations:{$in: [operationId]}},{$pull:{operations: {$in : [operationId]}}},{safe: true, upsert: false}, function(err, doc){
    if(err){
      console.log(err);
      return res.status(400).send('ERROR');
    }
    if(doc == null){
      return res.status(418).json('{error:\'Operation is already in timeline or timeline does not exist\'}');
    }else{
      doc.operations.pull(operationId);
      return res.status(202).json(doc);
    }
  });

}

exports.show = function(req, res){
  return res.status(200).send();
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
