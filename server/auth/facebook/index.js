'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', function(req, res, next) {
    passport.authenticate('facebook',
      function(err, user, info) {
        if(err) {
          if(err.errors.email && err.errors.email.message == 'The specified email address is already in use.') {
            return res.redirect('/signup?error=email')
          }else{
            return res.redirect('/signup');
          }
        }
        req.user = user;
        auth.setTokenCookie(req, res);
      }
  )(req, res, next);
});

module.exports = router;
