/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  app.use('/auth', require('./auth'));
  // Insert routes below
  app.use('/api/files', require('./api/file'));
  app.use('/api/locations', require('./api/location'));
  app.use('/api/transports', require('./api/transport'));
  app.use('/api/hashtags', require('./api/hashtag'));
  app.use('/api/travels', require('./api/travel'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/countries', require('./api/country'));
  app.use('/api/languages', require('./api/language'));
  app.use('/api/operations', require('./api/operation'));
  app.use('/api/rate', require('./api/rate'));
  app.use('/api/timeline', require('./api/timeline'));
  /* database info api */
  app.use('/api/back/db', require('./api/dbAPI'));
  app.use('/api/back/log', require('./api/log'));
  app.use('/api/company', require('./api/company'));
  /* Transports */
  app.use('/api/transport/type', require('./api/transportType'));
  app.use('/api/transport/comparators', require('./api/transportComparator'));


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets|lib)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      var p = app.get('appPath');
      if(req.url.indexOf("back") > -1){
        p = app.get('back');
      }
      res.sendFile(path.resolve(p + '/index.html'));
    });
};
