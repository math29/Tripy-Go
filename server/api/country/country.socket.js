/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CountryEvents = require('./country.event');
var events = ['save' , 'remove'];

exports.register = function(socket) {
  for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener( 'country:' + event, socket);

    CountryEvents.on(event, listener);
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
    CountryEvents.removeListener(event, listener);
  }
}
