'use strict';

var EventEmitter = require('events').EventEmitter;
var Operation = require('./operation.model');

var OperationEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
OperationEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Operation.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    OperationEmitter.emit(event , doc);
  }
}

module.exports  = OperationEmitter;
