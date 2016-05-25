'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');

var simpleUser = new User({
 provider: 'local',
 name: 'Fake User',
 email: 'test@test.com',
 password: 'password'
});

var adminUser = new User({
  provider: 'local',
  name: 'admin',
  email: 'admin@admin.com',
  password:'admin',
  role:'admin'
});

var sUser = {
  email:'test@test.com',
  password:'password'
}

var adminJS = {
  email:'admin@admin.com',
  password:'admin'
}

var token = "";
var tokenAdmin = "";


simpleUser.save(function(){
  request(app).post('/auth/local')
    .send(sUser).end(function(err, res){
      token = res.body.token;
    });
 });

adminUser.save(function(){
  request(app)
    .post('/auth/local')
    .send(adminJS)
    .end(function(err, res){
    tokenAdmin = res.body.token;

  });
});



describe('GET /api/comparators', function() {

  /*it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/comparators')
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });*/
});
