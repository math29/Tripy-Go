'use strict';

var EventEmitter = require('events').EventEmitter;
var Timeline = require('./timeline.model');

var TimelineEmitter = new EventEmitter();

// Set max event listeners (0 == unlimited)
TimelineEmitter.setMaxListeners(0);

var events = {
  'save' : 'save',
  'remove' : 'remove'
};

for(var e in events) {
  var event = events[e];
  Timeline.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Timeline.emit(event , doc);
  }
}

module.exports  = TimelineEmitter;
