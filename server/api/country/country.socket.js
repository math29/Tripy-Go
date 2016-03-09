/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Country = require('./country.model');

exports.register = function(socket) {
  Country.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Country.schema.post('update', function (doc) {
      onSave(socket, doc);
    });
  Country.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc) {
  socket.emit('country:save', doc);
}

/**
 * Appelé lorsqu'un pays est supprimé de la base de données
 *
 * @param socket: socket utilisée
 * @param doc: document supprimé
 *
 */
function onRemove(socket, doc) {
  socket.emit('country:remove', doc);
}
