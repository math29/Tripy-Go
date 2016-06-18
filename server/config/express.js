/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var logger = require('./logger');
var busboyBodyParser = require('busboy-body-parser');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

module.exports = function(app) {
  var env = app.get('env');
  var development_cache = 0;
  var production_cache = 86400000;

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(allowCrossDomain);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(busboyBodyParser());

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: process.env.OPENSHIFT_APP_NAME || 'wtc-dev'
    })
  }));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public'), { maxAge: production_cache}));
    app.set('appPath', path.join(config.root, 'public'));
    app.set('back', path.join(config.root, 'back/'));
    app.use('/back', express.static(path.join(config.root, 'back/'), { maxAge: production_cache}));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    // app.use('/front',express.static(path.join(config.root, 'client')));
    // app.set('/front', path.join(config.root, 'client'));
    app.set('appPath', path.join(config.root, 'frontOfficeA2/dist/'));
    app.set('back', path.join(config.root, 'back_office/dist/'));
    app.use( express.static(path.join(config.root, 'frontOfficeA2/dist/'), { maxAge: development_cache}));
    app.use('/back',express.static(path.join(config.root, 'back_office/dist/'), { maxAge: development_cache}));
    if('test' !== env){
      app.use('/doc', express.static(path.join(config.root, 'apidoc'), { maxAge: development_cache}));
      app.use(require('morgan')({ "stream": logger.stream }));
    }
    app.use(errorHandler()); // Error handler - has to be last
  }
};
