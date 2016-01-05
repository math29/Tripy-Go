/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Timeline = require('./timeline.model');

exports.register = function(socket) {
  Timeline.schema.post('save', function (doc) {
    console.log('SAVE');
    onSave(socket, doc);
  });
  Timeline.schema.post('remove', function (doc) {
    console.log('REMOVE');
    onRemove(socket, doc);
  });
  Timeline.schema.post('findOneAndUpdate', function(doc){
    console.log('UPDATE');
    console.log(doc);
    onSave(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('timeline:save', doc);
}

function onRemove(socket, doc) {
  socket.emit('timeline:remove', doc);
}
