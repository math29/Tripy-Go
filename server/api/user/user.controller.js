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

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user, next) {
    if (err) {
      logger.error("Could not retrieve user", userId);
      return next(err);
    }
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
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
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
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
      logger.error("Could not ge user infos ME", user);
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
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user, next) { // don't ever give out the password or salt
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
