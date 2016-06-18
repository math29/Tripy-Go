'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();
router.get('/logout', function(req, res){
  req.logOut();
  /*req.session.destroy(function(err){
    res.clearCookie('connect.sid');
    res.clearCookie('token');
    //res.redirect('/login');
    return res.status(200).send();
  });*/
});
router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));

module.exports = router;
