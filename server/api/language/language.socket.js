/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var Language = require('./language.model');

exports.register = function(socket) {

  Language.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Language.schema.post('update', function(){
    //onSave(socket, doc);

    console.log('post update');
  });
  Language.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc) {
  console.log("save language");
  socket.emit('language:save', doc);
}

function onRemove(socket, doc) {
  socket.emit('language:remove', doc);
}
