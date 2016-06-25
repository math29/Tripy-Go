'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var uuid = require('node-uuid');
var User = require('../user/user.model');

var NewsletterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  },
  subscribe: {
    type: Boolean,
    default: true,
  },
  unsubscribeToken: {
    type: String
  },
  isUser: {
    type: Boolean,
    default: false
  },
  addedAt: {
    type: Date
  }

});

/**
 * Create unsubscribe token,
 * check if user is already in db or not
 *
 */
NewsletterSchema.pre('save', function(next){
    var self = this;
    var token = uuid.v1();
    this.addedAt = Date.now();
    this.unsubscribeToken = token.replace(/\-/g,"");
    next();
    if(this.email) {
      User.findOne({email: self.email}, function(err, user) {
        if(err) {
          next(err);
        }
        if(user){
          self.isUser = true;
        }
        next();
      })
    } else {
      next();
    }

});
module.exports = mongoose.model('Subscribers', NewsletterSchema);
