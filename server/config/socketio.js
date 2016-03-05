/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var logger = require('./logger');

// When the user disconnects.. perform this
function onDisconnect(socket) {
  socket.emit('disconnected');
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    logger.info('[%s] %s', socket.address,JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/timeline/timeline.socket').register(socket);
  require('../api/operation/operation.socket').register(socket);
  require('../api/location/location.socket').register(socket);
  require('../api/transport/transport.socket').register(socket);
  require('../api/hashtag/hashtag.socket').register(socket);
  require('../api/travel/travel.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
  require('../api/language/language.socket').register(socket);
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

  socketio.on('connection', function (socket) {
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
