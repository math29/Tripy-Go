/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Transport = require('./transport.model');

exports.register = function(socket) {
  Transport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Transport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('transport:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('transport:remove', doc);
}