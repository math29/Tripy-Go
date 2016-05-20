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
  console.log('save');
  socket.emit('transportComparator:save', doc);
}

function onRemove(socket, doc, cb) {
  console.log('remove');
  socket.emit('transportComparator:remove', doc);
}
