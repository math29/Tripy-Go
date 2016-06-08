'use strict';

var EventEmitter = require('events').EventEmitter;
var Company = require('./company.model');

var CompanyEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompanyEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Company.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompanyEmitter.emit(event , doc);
  }
}

module.exports  = CompanyEmitter;
