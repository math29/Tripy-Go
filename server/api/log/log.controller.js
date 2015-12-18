'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Log = require('./log.model');
var TAG = "LogController";

/**
 * Get list of countries
 *
 * @param req request
 * @param res response
 */
exports.index = function(req, res) {
  Log.find()
  .sort({_id:1})
  .exec(
    function (err, logs) {
      // vérifie que la requête mongo n'à pas échoué
      if(err) {
        logger.error('%s: Can\'t index logs: '+1, TAG);
        return handleError(res, err);
      }
      var stats = {labels:['info', 'error', 'warn'], data:[0,0,0]};
      for(var i = 0; i< logs.length; i++){
        var log = logs[i];
        if(log.level === 'info'){
          stats.data[0]++;
        }else if(log.level === 'warn'){
          stats.data[2]++;
        }else if(log.level === 'error'){
          stats.data[1]++;
        }
      }
      var retObj = {stats: stats, logs: logs};
    return res.status(200).json(retObj);
  });
};

exports.paginated = function(req, res) {
  var find = {};
  if(req.params.level === 'debug' || req.params.level === 'info' || req.params.level == 'warn' || req.params.level== 'error'){
    find.level = req.params.level;
  }
  if(typeof req.params.message !== 'undefined'){
    find.message = {'$regex': req.params.message};
  }
  Log.find(find)
  .sort({_id:1})
  .exec(
    function (err, logs) {
      // vérifie que la requête mongo n'à pas échoué
      if(err) {
        logger.error('%s: Can\'t index logs: '+1, TAG);
        return handleError(res, err);
      }
      var stats = {labels:['info', 'error', 'warn'], data:[0,0,0], dataLocal:[0,0,0]};
      var pagination = {current: req.params.page, maxPage: logs.length%50};
      for(var i = 0; i< logs.length; i++){
        var log = logs[i];
        if(log.level === 'info'){
          stats.data[0]++;
        }else if(log.level === 'warn'){
          stats.data[2]++;
        }else if(log.level === 'error'){
          stats.data[1]++;
        }
      }
      logs = logs.slice((req.params.page-1)*50, req.params.page*50);

      var length = 50;
      if(logs.length < 50){
        length = logs.length;
      }
      if(length>0){
        for(var i=0; i<length; i++){
          var log = logs[i];
          if(log.level === 'info'){
            stats.dataLocal[0]++;
          }else if(log.level === 'warn'){
            stats.dataLocal[2]++;
          }else if(log.level === 'error'){
            stats.dataLocal[1]++;
          }
        }
      }

      var retObj = {stats: stats, logs: logs, pagination: pagination};
    return res.status(200).json(retObj);
  });
};

// Get a single log
exports.show = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) {
     return handleError(res, err);
    }
    if(!log) {
      logger.warn('%s: Could not found log with id: '+req.params.id, TAG);
      return res.status(404).send('Not Found');
    }
    return res.json(language);
  });
};

// Get a single country
exports.showByName = function(req, res) {
  var searchQuery = {};
  searchQuery[req.params.cat] = req.params.name;
  Log.find(searchQuery, function (err, log) {
    if(err) {
      return handleError(res, err);
    }
    if(!log) {
      return res.status(404).send('Not Found');
    }
    return res.json(log);
  });
};

// Deletes a country from the DB.
exports.destroy = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) {
      return handleError(res, err);
    }
    if(!log) {
      logger.error('can\'t find Log with id: '+req.params.id);
      return res.status(404).send('Not Found');
    }
    log.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      logger.info('Log was delete');
      return res.status(204).json('{success: \'No Content\'}');
    });
  });
};

/**
 * Vérifie que l'objet log comporte tous les attributs nécessaire
 */
function checkLogObject(log){
	var errors = {};
	errors.errors = [];

	if(!isDefined(log.message)){
  	errors.errors.push("Il manque le message");
  }
  if(!isDefined(log.timestamp)){
  	errors.errors.push("Il manque le timestamp du log");
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
