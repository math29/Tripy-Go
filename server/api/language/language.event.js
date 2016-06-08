'use strict';

var EventEmitter = require('events').EventEmitter;
var Language = require('./language.model');

var LanguageEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
LanguageEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Language.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LanguageEmitter.emit(event , doc);
  }
}

module.exports  = LanguageEmitter;
