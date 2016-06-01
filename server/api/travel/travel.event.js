'use strict';

var EventEmitter = require('events').EventEmitter;
var Travel = require('./travel.model');

var TravelEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
TravelEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Travel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TravelEmitter.emit(event , doc);
  }
}

module.exports  = TravelEmitter;
