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
  global.mongo_connection.stats(1024, function(err, stats){
    if(err){
      logger.error(err);
    }
    // delete db name info for security issues
    delete stats.db;
    return res.status(200).json(stats);
  });

 };

/**
 *
 * get the name of each collection
 *
 * @param req: request
 * @param res: response
 */
exports.getCollectionNames = function(req, res){
  mongoClient.connect(config.mongo.uri, function(err, db){
    if(err){
      logger.error("Can't connect to database");
      return res.status(500).json('{error:\'unable to connect database\'}');
    }else{
      db.collections(function(err, collections){
        // if there is an error
        if(err){
          logger.error("Can't get collections");
          return res.status(500).json('{error:\'cant get collections names\'}');
        }
        var names = [];
        collections.forEach(function(collection){
          names.push(collection.s.name);
        });
        var obj = {};
        obj.names = names;
        closeDB(db);
        return res.status(200).json(obj);
      });
    }
  });

};

/**
 * Récupére les statistiques de toutes les collections
 *
 * @param db: objet de database
 *
 */
 exports.allStats = function(req, res){
  var stats = [];
  mongoClient.connect(config.mongo.uri, function(err, db){
    if(err){
      logger.error("Unable to connect database");
      return res.status(500).json('{error:\'Unable to connect database\'}');
    }
    db.collections(function(err, collections){
      if(err){
        logger.error("Can't get collections");
        return res.status(500).json('{error:\'cant get collections\'}');
      }else{
        for(var i=0; i<collections.length; i++){
          db.collection(collections[i].s.name).stats(function(err, stat){
            if(err){
              logger.error("Unable to get stats for "+collections[i].s.name+" collection "+err);
            }else{
              stat.ns = stat.ns.substring(stat.ns.indexOf('.') + 1);
              stats.push(stat);
              if(stats.length === collections.length){
                return res.status(200).json(stats);
              }
            }

          });
        }
      }
    });
  });
};

exports.serverStatus = function(req, res){
  // Establish connection to db
  mongoClient.connect(config.mongo.uri, function(err, db) {
    if(err){
      logger.error('Unable to connect to database');
      return res.status(500).json('{error:\'Unable to connect database\'}');
    }
    // Use the admin database for the operation
    var adminDb = db.admin();
    // Authenticate using the newly added user
    adminDb.authenticate('WTCAdmin', 'WTCAdmin', function(err, result) {
      if(err){
        logger.error('Unable to connect to authenticate');
        adminDb.createUser({user:'WTCAdmin', pwd:'WTCAdmin', role:["readWrite", "dbAdmin"]}).exec();
        return res.status(500).json('{error:\'Unable to authenticate\'}');
      }
      // Retrive the server Info
      adminDb.serverStatus(function(err, info) {
        if(err){
          logger.error('Unable to get server status');
          return res.status(500).json('{error:\'Unable to get serverStatus\'}');
        }
        assert.ok(info !== null);
        closeDB(db);
        return res.status(200).json(info);
      });
    });
  });
};

exports.hostInfos = function(req, res){
  // Establish connection to db
  mongoClient.connect(config.mongo.uri, function(err, db) {
    if(err){
      logger.error('Unable to connect to database');
      return res.status(500).json('{error:\'Unable to connect database\'}');
    }
    // Use the admin database for the operation
    var adminDb = db.admin();
    // Authenticate using the newly added user
    adminDb.authenticate('WTCAdmin', 'WTCAdmin', function(err, result) {
      if(err){
        logger.error('Unable to connect to authenticate '+err);
        return res.status(500).json('{error:\'Unable to authenticate\'}');
      }
      // Retrive the server Info
      adminDb.command({'hostInfo':1},function(err, info) {

        assert.equal(null, err);
        assert.ok(info !== null);
        closeDB(db);
        return res.status(200).json(info);
      });
    });
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
