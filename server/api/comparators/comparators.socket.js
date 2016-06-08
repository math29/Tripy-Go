/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ComparatorsEvents = require('./comparators.event');
var events = ['save' , 'remove'];


exports.register = function(socket) {
  for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener( 'transportComparator:' + event, socket);

    ComparatorsEvents.on(event, listener);
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
    ComparatorsEvents.removeListener(event, listener);
  }
}
