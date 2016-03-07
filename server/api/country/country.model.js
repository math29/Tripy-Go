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


var CountryModel = mongoose.model('Country', CountrySchema);
/**
 * Vérifie que le pays n'existe pas déjà
 *
 */
CountrySchema.pre('save', function(next){
  var self = this;
  if(self.force){
    delete self.force;
    next();
  }
  CountryModel.find({name: self.name},function(err, docs){
    if(!docs.length){
      next();
    }else{
      next(new Error("Country exists!"));
    }
  });
});

module.exports = CountryModel;
