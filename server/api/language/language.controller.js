'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Language = require('./language.model');
var TAG = "LanguageController";

/**
 * Get list of countries
 *
 * @param req request
 * @param res response
 */
exports.index = function(req, res) {
  Language.find()
  .sort({name:1})
  .exec(
    function (err, languages) {
      // vérifie que la requête mongo n'à pas échoué
      if(err) {
        logger.error('%s: Can\'t index languages: '+1, TAG);
        return handleError(res, err);
      }
    return res.status(200).json(languages);
  });
};

// Get a single country
exports.show = function(req, res) {
  Language.findById(req.params.id, function (err, language) {
    if(err) {
     return handleError(res, err);
    }
    if(!language) {
      logger.warn('%s: Could not found country with id: '+req.params.id, TAG);
      return res.status(404).send('Not Found');
    }
    return res.json(language);
  });
};

// Get a single country
exports.showByName = function(req, res) {
  var searchQuery = {};
  searchQuery[req.params.cat] = req.params.name;
  Language.find(searchQuery, function (err, language) {
    if(err) {
      return handleError(res, err);
    }
    if(!language) {
      return res.status(404).send('Not Found');
    }
    return res.json(language);
  });
};

// Creates a new country in the DB.
exports.create = function(req, res) {
  var statusCode = 202;

  //verrification de l'objet country
  var errors = checkLanguageObject(req.body);

  // si il n'y à aucun message d'erreur, on ajoute le pays
	if(errors.errors.length === 0){
	  var language = new Language(req.body);
	  language.save(function(err){
		//Language.update({ name: { $eq: req.body.name}}, req.body, {upsert: true}, function(err, language) {
		if(err) {
		  return res.status(202).json('{error: \'La langue existe déjà\'}');
		}
		if(typeof language.upserted !== 'undefined'){
		  statusCode = 201;
		}
		return res.status(statusCode).json(language);
		});

	}
	// si il y à une erreur, on renvoi un code 400 avec les messages d'erreur
	else{
		return res.status(400).json(errors);
	}

};

// Updates an existing country in the DB.
exports.update = function(req, res) {
  // on vérifie si les paramètres sont corrects
  var errors = checkLanguageObject(req.body);

  // si la liste des erruers est vide, on peut lancer l'update
  if(errors.errors.length === 0){
    Language.findById(req.params.id, function (err, language) {
    if (err) {
      return handleError(res, err);
    }
    if(!language) {
      return res.status(404).send('Not Found');
    }

    _.merge(language, req.body).save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(language);
    });
  });
  }
  return res.status(400).json(errors);

};

// Deletes a country from the DB.
exports.destroy = function(req, res) {
  Language.findById(req.params.id, function (err, language) {
    if(err) {
      return handleError(res, err);
    }
    if(!language) {
      return res.status(404).send('Not Found');
    }
    language.remove(function(err) {
          if(err) {
            return handleError(res, err);
          }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Vérifie que l'objet language comporte tous les attributs nécessaire
 */
function checkLanguageObject(language){
	var errors = {};
	errors.errors = [];

	if(!isDefined(language.code)){
  	errors.errors.push("Il manque le code langue");
  }
  if(!isDefined(language.name)){
  	errors.errors.push("Il manque le nom de la langue");
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
  return res.status(500).send(err);
}
