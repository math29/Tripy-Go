'use strict';

var EventEmitter = require('events').EventEmitter;
var Transport = require('./transport.model');

var TransportEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
TransportEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Transport.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Transport.emit(event , doc);
  }
}

module.exports  = Transport;
