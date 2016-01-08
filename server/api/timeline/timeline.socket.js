/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Timeline = require('./timeline.model');

exports.register = function(socket) {
  Timeline.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Timeline.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  Timeline.schema.post('findOneAndUpdate', function(doc){
    onSave(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('timeline:save', doc);
}

function onRemove(socket, doc) {
  socket.emit('timeline:remove', doc);
}
