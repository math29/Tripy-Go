'use strict';

var EventEmitter = require('events').EventEmitter;
var Rate = require('./rate.model');

var RateEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
RateEmitter.setMaxListeners(0);
x
var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Rate.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Rate.emit(event , doc);
  }
}

module.exports  = RateEmitter;
