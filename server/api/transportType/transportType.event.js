'use strict';

var EventEmitter = require('events').EventEmitter;
var TransportType = require('./transportType.model');

var TransportTypeEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
TransportTypeEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  TransportType.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TransportTypeEmitter.emit(event , doc);
  }
}

module.exports  = TransportTypeEmitter;
