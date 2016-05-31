/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var logger = require('./logger');
var Member = require('../api/user/user.model');
var connected = {};

// When the user disconnects.. perform this
function onDisconnect(socket) {
  //socket.emit('disconnected');
  socket.removeAllListeners();
  delete connected[socket.decoded_token._id];
  socket.disconnect();
  Member.findById(socket.decoded_token._id,
    function(err, user){
      if(err) {
        logger.error(err);
      }
      if(user){
        user.connected = false;
        user.save(function(err){});
      }
    }
);
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    logger.info('[%s] %s', socket.address,JSON.stringify(data, null, 2));
  });
  //console.log(JSON.stringify(socket.decoded_token._id));
  // Insert sockets below
  require('../api/promo/promo.socket').register(socket);
  require('../api/timeline/timeline.socket').register(socket);
  require('../api/operation/operation.socket').register(socket);
  require('../api/location/location.socket').register(socket);
  require('../api/transport/transport.socket').register(socket);
  require('../api/hashtag/hashtag.socket').register(socket);
  require('../api/travel/travel.socket').register(socket);

  require('../api/thing/thing.socket').register(socket);
  require('../api/language/language.socket').register(socket);
  require('../api/country/country.socket').register(socket);
  require('../api/transportType/transportType.socket').register(socket);
  require('../api/company/company.socket').register(socket);
  require('../api/comparators/comparators.socket').register(socket);
  require('../api/user/user.socket').register(socket, connected);

  Member.findById(socket.decoded_token._id,
    function(err, user){
      if(err) {
        logger.error(err);
      }
      if(user){
        user.connected = true;
        user.save(function(err){});
      }

    }
);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', require('socketio-jwt').authorize({
    secret: config.secrets.session,
    timeout: 5000
  })).on('authenticated', function (socket) {
    //console.log('auth');
    //console.log(socket.decoded_token); // bar

    connected[socket.decoded_token._id] = socket;
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      logger.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    logger.info('[%s] CONNECTED', socket.address);
  });
};
