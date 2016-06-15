'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/wtc-dev'
  },
  google: {
    clientID: '765829177385-1bnr1517vieer4m2qhlfn176lsft6r1t.apps.googleusercontent.com',
    clientSecret: 'ViAh9-tpcqIzy2SCFlmfaMm0',
    callbackURL: '/auth/google/callback'
  },

  seedDB: true,
  // reprise de données
  rdo: false
};
