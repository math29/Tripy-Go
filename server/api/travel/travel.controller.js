'use strict';

var _ = require('lodash');
var Travel = require('./travel.model');
var User = require('../user/user.model');

// Get list of travels
exports.index = function(req, res) {
  Travel.find(function (err, travels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(travels);
  });
};

// Get a single travel
exports.show = function(req, res) {
  Travel.findById(req.params.id)
    .populate('author partners.user', '-hashedPassword -salt')
    .deepPopulate('transports.arrival.country transports.departure.country partners.user.picture')
    .exec(function (err, travel) {
    if(err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    return res.json(travel);
  });
};

exports.addPartner = function(req, res) {
  var updateObj = {user: req.params.userId, status: 'waiting'};
  Travel.update({_id: req.params.id,
    $or: [{ 'author':req.user._id }, {'partners.user': { $in : [req.user._id]}}],
    'partners.user': {$nin: [req.params.user_id]}},
    {$push: {'partners': updateObj}}, function(err, travel) {
    if(err) {
      return handleError(err, res);
    }
    console.log(travel);
    if(travel.nModified > 1) {
      return res.status(201).json({status: 201, data: 'User added'});
    }else {
      return res.status(204).json({status: 204, data: 'Can\'t add friend'});
    }
  });
}

exports.get_by_user_id = function(req, res) {
  User.findById(req.params.id, function(err, user){
    Travel.find({'_id':{$in: user.travels}},
      function (err, travels) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(travels);
      });
  });
};


var save_travel = function(req, res) {
  delete req.body.date_created;
  req.body.author = req.user._id;
  Travel.create(req.body, function(err, travel) {
    if(err) { return handleError(res, err); }
    if(travel.author){
      User.update(
        {_id: travel.author},
        { $push: {travels: travel}},
        function(err, affected, resp) {
        })
    }
    return res.status(201).json(travel);
  });
};

// Creates a new travel in the DB.
exports.create = function(req, res) {
  save_travel(req, res);
};

// Updates an existing travel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Travel.findById(req.params.id, function (err, travel) {
    if (err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    var updated = _.merge(travel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(travel);
    });
  });
};

// Deletes a travel from the DB.
exports.destroy = function(req, res) {
  Travel.findById(req.params.id, function (err, travel) {
    if(err) { return handleError(res, err); }
    if(!travel) { return res.status(404).send('Not Found'); }
    travel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.addSite = function(req, res) {
  Travel.findOne({_id: req.params.travelId,
    $or: [{'author': req.user._id}, {'partner.user': {$in: [req.user._id]}}]},
    function(err, travel) {
      if(err) {
        return handleError(err, res);
      }
      var siteIndex = _.findIndex(travel.sites, function(o){return o.site_id == req.params.siteId;});

      // si le site existe déjà
      if(siteIndex != -1) {
        // je vérifie qu'il n'est pas utilisé pour le même type de prestation
        var prestation = _.findIndex(travel.sites, function(o){return o.used_type == req.params.type});
        if(prestation != -1) {
          return res.status(200).json({status: 200, data:'Le site est déjà utilisé pour ce type de prestation'});
        } else {
          travel.sites[siteIndex].used_type.push(req.params.type);
          travel.save(function(err) {
            if(err) {
              return handleError(err, res);
            }
            return res.status(201).json({status: 200, data: 'La nouvelle prestation à bien été ajoutée'});
          })
        }
      }
      if(!travel.sites) {
        travel.sites = [];
      }
      travel.sites.push({site_id: req.params.siteId, used_type: [req.params.type]});
      travel.save(function(err) {
        if(err) {
          return handleError(err, res);
        }
        return res.status(201).json({status:201, data: 'Le site à bien été ajouté au voyage'});
      })
    }
  )

}

function handleError(res, err) {
  return res.status(500).send(err);
}
