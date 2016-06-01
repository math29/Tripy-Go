/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TravelEvents = require('./travel.event');
var events = ['save' , 'remove'];

exports.register = function(socket, connected) {
  /*Travel.schema.post('save', function (doc) {
    onSave(socket, doc, connected);
  });
  Travel.schema.post('remove', function (doc) {
    onRemove(socket, doc, connected);
  });*/
  for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener( 'travel:' + event, socket);

    TravelEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};

function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  }
}

function removeListener(event, listener) {
  return function() {
    TravelEvents.removeListener(event, listener);
  }
}

function onSave(socket, doc, connected) {
  var sock = isAllowed(socket, doc, connected);
  if(sock) {
    sock.emit('travel:save', doc);
  }
}

function isAllowed(socket, doc, connected) {
  console.log(JSON.stringify(doc));
  if(connected[doc.author]){
    if(socket.decoded_token._id == doc.author) {
      console.log('to author');
      return connected[doc.author];
    }
  }
  for(var i = 0; i < doc.partners.length; i++) {
    if(connected[doc.partners[i].user]) {
      if(socket.decoded_token._id == doc.partners[i].user) {
        return connected[doc.partners[i].user];
      }
    }
  }
  return;
}

function onRemove(socket, doc) {
  socket.emit('travel:remove', doc);
}
