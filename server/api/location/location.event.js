'use strict';

var EventEmitter = require('events').EventEmitter;
var Location = require('./location.model');

var LocationEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
LocationEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Location.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LocationEmitter.emit(event , doc);
  }
}

module.exports  = LocationEmitter;
