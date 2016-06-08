'use strict';

var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var logger = require('../../config/logger');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) {
      logger.error("Could not find users");
      return res.status(500).send(err);
    }
    return res.status(200).json(users);
  });

};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  var newUser = new User(req.body);
  logger.error("Contenu requête", req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) {
      logger.error("Could not create user", user);
      return validationError(res, err);
    }
    var jwtToken = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 60*60*5 });
    res.json({ token: jwtToken });
  });
};

exports.search = function(req, res) {
  var re = new RegExp(req.params.search, 'i');

  User.find().or([{"name": {$regex: re}}, {"fname": {$regex: re}}]).select({ name: 1, fname: 1, picture: 1 })
    .limit(5)
    .exec(function( err, users) {
        if(err) {
          return res.status(400).json({status: 400, data: 'Impossible de trouver la personne'});
        }
        return res.status(200).json({status: 200, data: users});
    });
}

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  var select = '-salt -role -hashedPassword -provider';
  if(userId != req.user._id) {
    select = 'name picture'
  }
  User.findById(userId).select(select).exec(function (err, user, next) {
    if (err) {
      logger.error("Could not retrieve user", userId);
      return next(err);
    }
    if (!user) return res.status(401).json({status: 401, data: 'Unauthorized'});
    return res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) {
      logger.error("Could not delete user", user);
      return res.status(500).send(err);
    }
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).json({data: 'OK', status: 200});
      });
    } else {
      res.status(202).json({data: 'No accepted', status: 202});
    }
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  User.findOne({
    _id: req.params.id
  }, '-salt -hashedPassword', function(err, user, next) { // don't ever give out the password or salt
    if (err) {
      logger.error("Could not get user infos ME", user);
      return next(err);
    }
    if (!user) {
      logger.warn("User not auhenticated");
      return res.status(401).send('Unauthorized');
    }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      res.json(user);
    });
  });
};

// Add a Prefered Destination
exports.addPreferedDestination = function(req, res) {
  User.findOne({
    _id: req.params.id
  }, '-salt -hashedPassword', function(err, user, next){
    if (err) {
      logger.error("Could not get user infos ME", user);
      return next(err);
    }
    if (!user) {
      logger.warn("User not auhenticated");
      return res.status(401).send('Unauthorized');
    }
    if (!req.body.preferedDests) {
      logger.warn("No preferedDest Given");
      return res.status(401).send('No preferedDest Given');
    }

    user.dest_prefereds = req.body.preferedDests;

    user.save(function (err) {
      if (err) { return handleError(res, err); }
      res.json(user);
    });
  });
}

/**
 * Change a users role
 */
exports.changeRole = function(req, res) {
  var userId = req.params.id;
  var userRole = req.params.role;


  User.findOneAndUpdate({_id: userId},{$set:{role: userRole}}, function (err, user) {
    if(err){
      logger.error(err);
    }
    return res.status(200).json(user);
  });
};

/**
 * Get my info
 */
exports.me = function(req, res) {
  var userId = req.user._id;
  User.findOne({_id: userId}, '-salt -hashedPassword')
    .populate('travels')
    .exec(function(err, user, next) { // don't ever give out the password or salt
    if (err) {
      logger.error("Could not ge user infos ME", user);
      return next(err);
    }
    if (!user) {
      logger.warn("User not auhenticated");
      return res.status(401).send('Unauthorized');
    }
    res.json(user);
  });
};

/**
 * Automatic update User Visited Countries
 */
 exports.putAutomaticUpdateVisetedCountries = function(req, res){
  var userId = req.params.id;
  User.findOne({_id: userId}, '-salt -hashedPassword')
    .populate('travels')
    .exec(function(err, user, next){
      if (err) {
        logger.error("Could not ge user", user);
        return next(err);
      }
      if (!user) {
        logger.warn("User not auhenticated");
        return res.status(401).send('Unauthorized');
      }
      User.deepPopulate(user,[
          'travels.transports.departure.country',
          'travels.transports.arrival.country'
        ],function(err, user){
          // Instanciation si première complétion
          if(!user.visited_countries){
            user.visited_countries = [];
          }
          if(user.travels){
            // On récupère la liste des pays visités
            for(var i = 0; i<user.travels.length; i++){
              var travel = user.travels[i];
              for(var j=0; j<travel.transports.length; j++){
                var transport = travel.transports[j];
                var dep_code = transport.departure.country.country_code.toLowerCase();
                var arr_code = transport.arrival.country.country_code.toLowerCase();
                if(user.visited_countries.indexOf(dep_code) == -1){
                  user.visited_countries.push(dep_code);
                }
                if(user.visited_countries.indexOf(arr_code) == -1){
                  user.visited_countries.push(arr_code);
                }
              }
            }
          }
          user.save(function (err) {
            if (err) { return handleError(res, err); }
            res.json(user);
          });
        });
    });
 }

 /**
 * Add or remove a Visited Country
 */
 exports.putUpdateVisetedCountries = function(req, res){
  var userId = req.params.id;
  var country = req.body.country.toLowerCase();

  if(!country || country == ""){
    logger.warn("Country not founded in body");
    return res.status(401).send('Need a country code');
  }

  User.findOne({_id: userId}, '-salt -hashedPassword', function(err, user, next){
    if (err) {
      logger.error("Could not ge user", user);
      return next(err);
    }
    if (!user) {
      logger.warn("User not auhenticated");
      return res.status(401).send('Unauthorized');
    }

    if(user.visited_countries.indexOf(country) > -1){
      logger.warn("Country already added");
      return res.status(401).send('This country is already in visited countries of this user');
    }

    user.visited_countries.push(country);

    user.save(function (err) {
      if (err) { return handleError(res, err); }
      res.json(user);
    });
  });
 }

/**
 * Récupére l'ensemble des roles que l'administrateur peut assigner
 */
exports.getRoles = function(req, res){
  var roles = {roles: config.userRoles.slice(0, config.userRoles.indexOf(req.user.role)+1)};
  return res.status(200).json(roles);
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.status(500).send(err);
}
