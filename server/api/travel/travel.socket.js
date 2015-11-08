/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Travel = require('./travel.model');

exports.register = function(socket) {
  Travel.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Travel.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('travel:save', doc);
}

function onRemove(socket, doc) {
  socket.emit('travel:remove', doc);
}
