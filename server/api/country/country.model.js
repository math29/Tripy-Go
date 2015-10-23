'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
  country_code: String,
  country_name: String,
  currency_code: String,
  capital: String,
  continent: String,
  population: Number,
  area: Number,
  languages: String
});

module.exports = mongoose.model('Country', CountrySchema);