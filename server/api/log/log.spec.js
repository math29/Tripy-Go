'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');


var token = "";

var simpleUser = new User({
 provider: 'local',
 name: 'Fake User',
 email: 'test@test.com',
 password: 'password'
});

var sUser = {
  email:'test@test.com',
  password:'password'
}

simpleUser.save(function(){
      request(app).post('/auth/local')
        .send(sUser).end(function(err, res){
          token = res.body.token;
        });
 });

describe('API /api/log', function() {


  it('should respond with Unauthorized', function(done) {
    request(app)
      .get('/api/back/log')
      .set({'Authorization': 'Bearer '+token})
      .expect(403)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});

