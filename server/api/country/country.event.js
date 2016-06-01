'use strict';

var EventEmitter = require('events').EventEmitter;
var Country = require('./country.model');

var CountryEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
CountryEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Country.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CountryEmitter.emit(event , doc);
  }
}

module.exports  = CountryEmitter;
