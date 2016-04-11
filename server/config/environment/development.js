'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/wtc-dev'
  },

  seedDB: true,
  // reprise de données
  rdo: false
};
