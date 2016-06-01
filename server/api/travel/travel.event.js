'use strict';

var EventEmitter = require('events');
var Travel = require('./travel.model');
var TravelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TravelEvents.setMaxListeners(0);

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
    TravelEvents.emit(event + ':' + doc._id, doc);
  }
}

export default TravelEvents;
