/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TransportType = require('./transportType.model');

exports.register = function(socket) {
  TransportType.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TransportType.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('transportType:save', doc);
}

function onRemove(socket, doc) {
  socket.emit('transportType:remove', doc);
}
