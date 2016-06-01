/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Travel = require('./travel.model');

exports.register = function(socket, connected) {
  Travel.schema.post('save', function (doc) {
    onSave(socket, doc, connected);
  });
  Travel.schema.post('remove', function (doc) {
    onRemove(socket, doc, connected);
  });
};

function onSave(socket, doc, connected) {
  var sock = isAllowed(socket, doc, connected);
  if(sock) {
    sock.emit('travel:save', doc);
  }
}

function isAllowed(socket, doc, connected) {
  if(connected[doc.author]){
    if(socket.decoded_token._id == doc.author) {
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

/*function onSave(socket, doc, connected) {
  //return function(){
    if(doc.notifications.length > 0) {
      //console.log('emit notification');
      if(connected[doc._id]){
        connected[doc._id].emit('notifications', doc.notifications);
      }
    }
  //}
}*/
function onRemove(socket, doc) {
  socket.emit('travel:remove', doc);
}
