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
  facebook: {
    clientID: '1458587271137573',
    clientSecret: 'af81e48c41f532e4074c5faae25129b5',
    callbackURL: '/auth/facebook/callback'
  },

  seedDB: true,
  // reprise de données
  rdo: false
};
