var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        if(err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'google',
            picture: profile._json.image.url,
            google: profile._json
          });
          user.save(function(err) {
            if (err) {
              if(err.name == 'ValidationError') {
                if(err.errors.email && err.errors.email.message == 'The specified email address is already in use.') {
                  return done(err, false, { message : 'L\'adresse email est déjà utilisée' });
                }else {
                  return done(err);
                }
              }else {
                return done(err);
              }
            }
            done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
