/**
 * Main application file
 */

'use strict';


// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var TAG = "Tripygo-App";

if(process.env.NODE_ENV == 'production') {
  var opbeat = require('opbeat').start({
    appId: '6a7c671113',
    organizationId: '7d627d1ebae349f4998468bc2339b064',
    secretToken: 'f12fa9b600f7c51934f58b7db4b20379487c52a5'
  });
}

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var logger = require('./config/logger');
var winston = require('winston');
var User = require('./api/user/user.model.js');
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
// requiert WinstonDB pour logger dans mongoDB.
require('winston-mongodb');


mongoClient.connect(config.mongo.uri, function(err, db) {
  if(err){
    exit(-1);
  }
  global.mongo_connection = db;
  });
// on ne transmet les logs que sur les environnement de développement et de production
switch(process.env.NODE_ENV){
  case 'production':
    removeConsole(logger);
    addMongoLog(logger, config.mongo.uri);
    break;
  case 'test':
    removeConsole(logger);
    logger.remove(winston.transports.File);
    		logger.add(winston.transports.File, {
    			level: 'debug',
                filename: './logs/tests-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 1,
                colorize: false
    		});
    break;
  default:
    addMongoLog(logger, config.mongo.uri);
    break;
}

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	logger.error('MongoDB connection error: '+err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) {
  require('./config/seed');
}else{
  User.update({email: {$in : ['yoann.diquelou@gmail.com', 'maaath29@gmail.com']}},{$set:{role: 'adminInfo'}}).exec();
}

if(config.rdo){
  require('./rdo/rates');
  require('./rdo/countries');
}
// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
// fichiers de configurations
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);


// Start server
server.listen(config.port, config.ip, function () {
  logger.info('server listening on %d, in %s mode on ip: %s', config.port, app.get('env'), config.ip);
});

// Expose app
module.exports = app;

/**
 * supprime la sortie console du logger log
 *
 * @param log logger dont on veut supprimer la sortie
 */

function removeConsole(log){
  log.info("remove console output");
  log.remove(winston.transports.Console);
}


/**
 * ajoute la sortie mongo au logger log
 *
 * @param log logger dont on veut ajouter la sortie
 */
function addMongoLog(log, database){
  log.add(winston.transports.MongoDB,{
    level: 'warn',
    db: database
   });
   log.info("add MongoDB output to output");
}
