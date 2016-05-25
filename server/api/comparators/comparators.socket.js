/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TransportComparator = require('./comparators.model');

exports.register = function(socket) {
  TransportComparator.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TransportComparator.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('transportComparator:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('transportComparator:remove', doc);
}
