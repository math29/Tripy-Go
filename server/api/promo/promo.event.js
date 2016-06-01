'use strict';

var EventEmitter = require('events').EventEmitter;
var Promo = require('./promo.model');

var PromoEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
PromoEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Promo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PromoEmitter.emit(event , doc);
  }
}

module.exports  = PromoEmitter;
