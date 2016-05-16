/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var http = require('https');
var Promo = require('./promo.model');
var Facebook = require('../facebook_platform/facebook.model');


exports.register = function(socket) {
  console.log('REGISTER');
  Promo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Promo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}


function onSave(socket, doc, cb) {

  if(process.env.NODE_ENV == 'development') {
    console.log('saving promo');
    Facebook.find({}, function(err, doc) {
      if(err) {
        console.log(err);
      }else {
        console.log(doc);
        var tr_req = http.request({
          host: 'yoann-diquelou.fr',
          port: '8082',
          path: '/tripy',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }, function(resp) {
          resp.on('data', function(chunk){
            console.log(chunk)
          }).on("error", function(e){
          console.log("Got error: " + e.message);
        });
      });
      tr_req.write(String({"dest": doc}));
      tr_req.end();
      }
    });
  }else {
    console.log('Messenger platform message will not be send, it could be take as a spam');
  }
  socket.emit('promo:save', doc);

}

function onRemove(socket, doc, cb) {
  console.log('remove promo');
  socket.emit('promo:remove', doc);
}
