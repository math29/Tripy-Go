'use strict';

var _ = require('lodash');
var Travel = require('../travel/travel.model');
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
  User.update({_id: req.user._id , 'notifications.template':'normal'}, {$pull :{'notifications': { _id: req.params.id}}}, function(err, updated) {
    if(err) {
      handleError(res, err);
    }
    return res.status(200).json({status: 200, data: 'Notification acknowledged'});
  });
}

exports.tripAck = function(req, res) {
  Travel.findOne({_id: req.params.travelId, 'partners.user': {$in: [req.user._id]}}, function(err, travel) {
    if(err) {
      return handleError(res, err);
    }
    if(travel) {
      var index = _.findIndex(travel.partners, function(o) {return o.user == req.user._id});
      if(req.params.status == 'OK') {

        if(index != -1) {
          travel.partners[index].status = 'OK';
        }
        // save travel
        travel.save(function(err){});
        User.findById(req.user._id, function(err, user) {
          if(err) {
            return res.status(500).json({status: 500, data: err});
          }
          user.travels.push(travel._id);
          user.notifications.push({title: 'Bienvenue dans votre nouveau voyage', body:'Découvrez le superbe voyage que vous avez accepté', link: '/travel/'+travel._id});
          var indexNotif = _.find(user.notifications, function(o){return o.link == travel._id});
          if(indexNotif != -1) {
            user.notifications.splice(indexNotif, 1);
          }
          var participants = [];
          for(var i = 0; i < travel.partners.length; i++) {
            if(travel.partners[i].status == 'OK')participants.push(travel.partners[i].user);
          }
          participants.push(travel.author);
          notifyOtherTripys(true, user.name, travel._id, [travel.author]);
          user.save(function(err){});
          return res.status(201).json({status: 201, data:'Vous avez accepté le voyage'});
        });
      }else if(req.params.status == 'NOK') {
        User.findById(req.user._id, function(err, user) {
          if(err) {
            return handleError(res, err);
          }
          var indexNotif = _.find(user.notifications, function(o){return o.link == travel._id});
          if(indexNotif != -1) {
            user.notifications.splice(indexNotif, 1);
          }
          user.save(function(err){});

          travel.partners.splice(index, 1);
          notifyOtherTripys(false, user.name, travel._id, [travel.author]);
          travel.save(function(err) {});
          return res.status(200).json({status: 200, data: 'Vous avez refusé l\'invitation'});
        })
      }else {
        return res.status(500).json({status: 500, data: 'Je ne comprends pas votre réponse'});
      }
    }else {
      return res.status(400).json({status: 400, data: 'Le voyage n\'existe pas, ou vous n\'y êtes pas convié'});
    }
  })
}

/**
 * Notify other partners
 *
 * @param {success} does the user accept or reject the offer
 * @param {new_name} name of the user
 * @param { travelId } id of the travel
 * @param {ids} array of id of other partners
 */
function notifyOtherTripys(success, new_name, travelId, ids){
    User.find({_id: {$in: ids}}, function(err, users){
      if(err){
          return
      }
      if(success) {
        for(var i = 0; i< users.length; i++) {
          users[i].notifications.push(
            {title: 'Nouveau partenaire',
            body: new_name + ' viens de rejoindre votre voyage',
            link: '/travel/'+travelId});
          users[i].save(function(err){});
        }
      } else {
        user.notifications.push(
          {title: 'Nouveau partenaire',
          body: new_name + ' viens de refuser votre invitation',
          link: '/travel/'+travelId});
        user.save(function(err){});
      }

    });
  }
function handleError(res, err) {
  return res.status(500).json({status: 500 , data: err});
}
