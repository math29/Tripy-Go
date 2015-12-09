'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var mongo = require('mongodb');
var config = require('../../config/environment');
var assert = require('assert');
var mongoClient = mongo.MongoClient;
/**
 * Get db stats
 *
 * @param req request
 * @param res response
 */
exports.stats = function(req, res) {
  mongoClient.connect(config.mongo.uri, function(err, db) {
    assert.equal(null, err);
    db.stats(1024, function(err, stats){
        // delete db name info for security issues
        delete stats.db;
        getCollectionStats(db);
        //closeDB(db);
        return res.status(200).json(stats);
    });

  });
 };

function getCollectionNames(db){

};

function getCollectionStats(db){

  //var collections = getCollectionNames(db);
  db.collections(function(err, collections){
      if(err){
        logger.error("Can't get collections");
        return null;
      }
      collections.forEach(function(collection){
          console.log(collection.s.name);
          db.collection(collection.s.name).stats(function(err, stat){
            if(err)console.log(err);
            console.log(stat);
          });
      });
      return collections;
    });

};


/**
 * Close database
 *
 $ @param db database
 */
function closeDB(db){
  db.close();
}
