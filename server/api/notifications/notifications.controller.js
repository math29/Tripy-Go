'use strict';

var _ = require('lodash');
//var Travel = require('./travel.model');
var User = require('../user/user.model');


// Get user notifications
exports.show = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err){
      return handleError(res, err);
    }
    return res.status(200).json({status: 200, data:user.notifications});
  })
};

// L'utilisateur dit qu'il à bien vu la notification
exports.acknowledge = function(req, res) {
  User.update({_id: req.user._id , template:'normal'}, {$pull :{'notifications': { _id: req.params.id}}}, function(err, updated) {
    if(err) {
      handleError(res, err);
    }
    return res.status(200).json({status: 200, data: 'Notification acknowledged'});
  });
}

function handleError(res, err) {
  return res.status(500).json({status: 500 , data: err});
}
