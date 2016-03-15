'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var Company = require('./company.model');
var TAG = "CompanyController";

/**
 * Get list of companies
 *
 * @param req request
 * @param res response
 */
exports.index = function(req, res) {
  Company.find()
  .sort({name:1})
  .exec(
    function (err, companies) {
      // vérifie que la requête mongo n'à pas échoué
      if(err) {
        logger.error('%s: Can\'t index companies: '+1, TAG);
        return handleError(res, err);
      }
    return res.status(200).json(conpanies);
  });
};

// Get a single company
exports.show = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if(err) {
     return handleError(res, err);
    }
    if(!company) {
      logger.warn('%s: Could not found company with id: '+req.params.id, TAG);
      return res.status(404).send('Not Found');
    }
    return res.json(company);
  });
};

// Get a single company by name
exports.showByName = function(req, res) {
  var searchQuery = {};
  searchQuery[req.params.cat] = req.params.name;
  Company.find(searchQuery, function (err, company) {
    if(err) {
      return handleError(res, err);
    }
    if(!country) {
      return res.status(404).send('Not Found');
    }
    return res.json(company);
  });
};

// Creates a new company in the DB.
exports.create = function(req, res) {

  var statusCode = 202;

  //verrification de l'objet country
  var errors = checkCompanyObject(req.body);

  // si il n'y à aucun message d'erreur, on ajoute le pays
	if(errors.errors.length === 0){
		var company = new Company(req.body);
		company.save(function(err){
		if(err) {
		  logger.error(err);
		  return handleError(res, err);
		}
		if(typeof company.upserted !== 'undefined'){
		  statusCode = 201;
		}
		return res.status(statusCode).json(company);
		});

	}
	// si il y à une erreur, on renvoi un code 400 avec les messages d'erreur
	else{
		return res.status(400).json(errors);
	}

};

// Updates an existing company in the DB.
exports.update = function(req, res) {
  // on vérifie si les paramètres sont corrects
  var errors = checkCompanyObject(req.body);

  // si la liste des erruers est vide, on peut lancer l'update
  if(errors.errors.length === 0){
    Company.findById(req.params.id, function (err, company) {
    if (err) {
      return handleError(res, err);
    }
    if(!company) {
      return res.status(404).send('Not Found');
    }

    _.merge(company, req.body).save(function (err) {

      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(company);
    });
  });
  }

};

// Deletes a company from the DB.
exports.destroy = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if(err) {
      return handleError(res, err);
    }
    if(!company) {
      return res.status(404).send('Not Found');
    }
    company.remove(function(err) {
          if(err) {
            return handleError(res, err);
          }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Vérifie que l'objet company comporte tous les attributs nécessaire
 */
function checkCompanyObject(company){
	var errors = {};
	errors.errors = [];

	if(!isDefined(company.name)){
  	errors.errors.push("Il manque le npm de la compagnie");
  }
  if(!isDefined(company.img)){
  	errors.errors.push("Il manque l'url de l'image");
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
