'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var mongo = require('mongodb');
var config = require('../../config/environment');
var assert = require('assert');
var async = require('async');
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
        return getCollectionStats(db, res);
        //closeDB(db);
        //return res.status(200).json(stats);
    });

  });
 };

/**
 *
 * get the name of each collection
 *
 * @param db: database object
 */
function getCollectionNames(db, callback){
  db.collections(function(err, collections){
    // if there is an error
    if(err){
      logger.error("Can't get collections");
      return null;
    }
    var names = [];
    collections.forEach(function(collection){
      names.push(collection.s.name);
    });
    return names;
  });
}

/**
 * Récupére les statistiques de toutes les collections
 *
 * @param db: objet de database
 *
 */
function getCollectionStats(db, res){
  var stats = [];
  db.collections(function(err, collections){
    // if there is an error
    if(err){
      logger.error("Can't get collections");
      return null;
    }

    collections.forEach(function(collection){
      db.collection(collection.s.name).stats(function(err, stat){
        if(err){
          logger.log(err);
        }
        stats.push(stat);
      });
    });
    return res.status(200).json(stats);
  });  
}


/**
 * Close database
 *
 $ @param db database
 */
function closeDB(db){
  db.close();
}
