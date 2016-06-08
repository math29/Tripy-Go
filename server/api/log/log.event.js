'use strict';

var EventEmitter = require('events').EventEmitter;
var Log = require('./log.model');

var LogEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
LogEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Log.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LogEmitter.emit(event , doc);
  }
}

module.exports  = LogEmitter;
