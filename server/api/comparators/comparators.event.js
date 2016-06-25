'use strict';

var EventEmitter = require('events').EventEmitter;
var Comparator = require('./comparators.model');

var ComparatorEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
ComparatorEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Comparator.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ComparatorEmitter.emit(event , doc);
  }
}

module.exports  = ComparatorEmitter;
