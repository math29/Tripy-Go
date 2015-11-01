'use strict';

var _ = require('lodash');
var Country = require('./country.model');

// Get list of countries
exports.index = function(req, res) {
  Country.find()
  .sort({country_name:1})
  .exec(
    function (err, countries) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(countries);
  });
};

// Get a single country
exports.show = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    return res.json(country);
  });
};

// Get a single country
exports.showByName = function(req, res) {
  var searchQuery = {};
  searchQuery[req.params.cat] = req.params.name;
  Country.find(searchQuery, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    return res.json(country);
  });
};

// Creates a new country in the DB.
exports.create = function(req, res) {

	var statusCode = 202;

  //verrification de l'objet country
	var errors = checkCountryObject(req.body);

  // si il n'y à aucun message d'erreur, on ajoute le pays
	if(errors.errors.length === 0){
		Country.update({ country_name: { $eq: req.body.country_name}}, req.body, {upsert: true}, function(err, country) {
		if(err) { return handleError(res, err); }
		if(typeof country.upserted !== 'undefined')statusCode = 201;
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
  if(req.body._id) { delete req.body._id; }

  var errors = checkCountryObject(req.body);

  if(errors.errors.length === 0){
  Country.findById(req.params.id, function (err, country) {
    if (err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    var updated = _.merge(country, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(country);
    });
  });
  }else{
    return res.status(400).json(errors);
  }
};

// Deletes a country from the DB.
exports.destroy = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    country.remove(function(err) {
      if(err) { return handleError(res, err); }
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

	if(typeof country.country_code === 'undefined' || country.country_code === ""){
  		errors.errors.push("Il manque le code pays");
  	}
  	if(typeof country.country_name === 'undefined' || country.country_name === ""){
  		errors.errors.push("Il manque le nom du pays");
  	}
  	if(typeof country.population === 'undefined' || country.population === ""){
  		country.population = 0;
  	}
  	if(typeof country.continent === 'undefined' || country.continent === ""){
  		errors.errors.push("Il manque le continent du pays");
  	}
  	if(typeof country.area === 'undefined' || country.area === ""){
  		errors.errors.push("Il manque la superficie du pays");
  	}
  	return errors;
}

function handleError(res, err) {
  return res.status(500).send(err);
}
