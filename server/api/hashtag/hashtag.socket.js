/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Hashtag = require('./hashtag.model');

exports.register = function(socket) {
  Hashtag.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Hashtag.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('hashtag:save', doc);
}

function onRemove(socket, doc) {
  socket.emit('hashtag:remove', doc);
}
