'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Country = require('./country.model');
var TAG = "CountryController";

/**
 * Get list of countries
 *
 * @param req request
 * @param res response
 */
exports.index = function(req, res) {
  Country.find()
  .sort({country_name:1})
  .exec(
    function (err, countries) {
      // vérifie que la requête mongo n'à pas échoué
      if(err) {
        logger.error('%s: Can\'t index country: '+1, TAG);
        return handleError(res, err);
      }
    return res.status(200).json(countries);
  });
};

// Get a single country
exports.show = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) {
     return handleError(res, err);
    }
    if(!country) {
      logger.warn('%s: Could not found country with id: '+req.params.id, TAG);
      return res.status(404).send('Not Found');
    }
    return res.json(country);
  });
};

// Get a single country
exports.showByName = function(req, res) {
  var searchQuery = {};
  searchQuery[req.params.cat] = req.params.name;
  Country.find(searchQuery, function (err, country) {
    if(err) {
      return handleError(res, err);
    }
    if(!country) {
      return res.status(404).send('Not Found');
    }
    return res.json(country);
  });
};

// Creates a new country in the DB.
exports.create = function(req, res) {

  var statusCode = 201;

  //verrification de l'objet country
  var errors = checkCountryObject(req.body);

  // si il n'y à aucun message d'erreur, on ajoute le pays
	if(errors.errors.length === 0){
		var country = new Country(req.body);
		country.save(function(err){
		if(err) {
		  logger.error(err);
		  return handleError(res, err);
		}

		return res.status(statusCode).json(country);
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
  var errors = checkCountryObject(req.body);

  // si la liste des erruers est vide, on peut lancer l'update
  if(errors.errors.length === 0){
    Country.findById(req.params.id, function (err, country) {
    if (err) {
      return handleError(res, err);
    }
    if(!country) {
      return res.status(404).send('Not Found');
    }

    _.merge(country, req.body).save(function (err) {

      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(country);
    });
  });
  }

};

// Deletes a country from the DB.
exports.destroy = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) {
      return handleError(res, err);
    }
    if(!country) {
      return res.status(404).send('Not Found');
    }
    country.remove(function(err) {
          if(err) {
            return handleError(res, err);
          }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Vérifie que l'objet country comporte tous les attributs nécessaire
 */
function checkCountryObject(country){
	var errors = {};
	errors.errors = [];

	if(!isDefined(country.country_code)){
  	errors.errors.push("Il manque le code pays");
  }
  if(!isDefined(country.country_name)){
  	errors.errors.push("Il manque le nom du pays");
  }
  if(!isDefined(country.population)){
  	country.population = 0;
  }
  if(!isDefined(country.continent)){
  	errors.errors.push("Il manque le continent du pays");
  }
  if(!isDefined(country.area)){
  	errors.errors.push("Il manque la superficie du pays");
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
