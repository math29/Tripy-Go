/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var TAG = "WTC-App";

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var logger = require('./config/logger');
var winston = require('winston');

// on ne transmet les logs que sur les environnement de développement et de production
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'){
	logger.remove(winston.transports.Console);
	if(process.env.NODE_ENV === 'test'){
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
	}

}

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	logger.error('MongoDB connection error: '+err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

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
  logger.info('server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
