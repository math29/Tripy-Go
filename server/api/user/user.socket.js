/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('./user.model');

exports.register = function(socket, connected) {
  User.schema.post('save', function (doc) {
    console.log('save');
    onSave(socket, doc, connected);
  });
  User.schema.post('update', function (doc) {
    console.log('update');
      onSave(socket, doc, connected);
    });
  User.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, connected) {
  console.log(doc);
  if(doc.notifications.length > 0) {
    console.log('emit notification');
    if(connected[doc._id]){
      connected[doc._id].emit('notifications', doc.notifications);
    }
  }
}

/**
 * Appelé lorsqu'une entreprise est supprimé de la base de données
 *
 * @param socket: socket utilisée
 * @param doc: document supprimé
 *
 */
function onRemove(socket, doc) {
  socket.emit('company:remove', doc);
}
