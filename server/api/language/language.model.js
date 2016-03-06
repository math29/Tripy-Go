'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LanguageSchema = new Schema({
  code: {type: String, required: true},
  name: {type: String, required: true},
  note: {type: String}
  });

var LanguageModel = mongoose.model('Language', LanguageSchema);

/**
 * Vérifie que la langue n'existe pas déjà
 *
 */
LanguageSchema.pre('save', function(next){
  var self = this;
  LanguageModel.find({name: self.name},function(err, docs){
    if(!docs.length){
      next();
    }else{
      next(new Error("Language exists!"));
    }
  });
});

module.exports = LanguageModel;
