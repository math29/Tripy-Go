/*
 * Rajoute le champ type à tous les votes qui ne l'ont pas
 */
var config = require('../config/environment');
var logger = require('../config/logger.js');
var mongo = require('mongodb');
var assert = require('assert');
var mongoClient = mongo.MongoClient;

mongoClient.connect(config.mongo.uri, function(err, db) {
  assert.equal(null, err);
  db.collection("rates").update({type: {$exists: false}}, {$set: {type: "Stack"}}, {multi:true}, function(err, updated){
      if(err){
        logger.error(err);
      }
      logger.info(updated);
      db.close();
    });
});
