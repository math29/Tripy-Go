/**
 * Broadcast updates to client when the model changes
 */

 'use strict';

 var LogEvents = require('./log.event');
 var events = ['save' , 'remove'];

exports.register = function(socket) {
  for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener( 'log:' + event, socket);

    LogEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};

function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  }
}

function removeListener(event, listener) {
  return function() {
    LogEvents.removeListener(event, listener);
  }
}
