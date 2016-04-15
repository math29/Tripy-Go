/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Company = require('./company.model');

exports.register = function(socket) {
  Company.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Company.schema.post('update', function (doc) {
      onSave(socket, doc);
    });
  Company.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('company:save', doc);
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
