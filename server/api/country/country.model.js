'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
  country_code: {type: String, required: true},
  country_name: {type: String, required: true},
  currency_code: String,
  capital: {type: String, required: true},
  continent: {type: String, required: true},
  population: Number,
  area: {type: Number, required: true},
  languages: String
});



module.exports = mongoose.model('Country', CountrySchema);
