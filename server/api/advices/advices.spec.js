'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Advices = require('./advices.model');

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

/*
 * Get token for simple user
 */
simpleUser.save(function(){
      request(app).post('/auth/local')
        .send(sUser).end(function(err, res){
          token = res.body.token;
        });
 });

/*
 * Get admin user token
 */
adminUser.save(function(){
  request(app)
    .post('/auth/local')
    .send(adminJS)
    .end(function(err, res){
    tokenAdmin = res.body.token;
  });
});

/*
 * Let's test the API
 */
describe('API /api/advices', function() {

  after(function(done) {
    Advices.remove({}).exec().then(function(){
      done();
    });
  });

  it('should create an advice', function(done) {
    request(app)
      .post('/api/advices')
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send(
        {
          "url": "https://google.com",
          "img":"http://vignette4.wikia.nocookie.net/desencyclopedie/images/2/26/Sourire_de_biquette.jpg/revision/latest?cb=20090902212908",
          "title":"Titre bidon",
          "description":"Description bidon"
      }
      )
      .expect(201)
      .end(function(err, res) {
        if(err) {
          return done(err);
        }
        done();
      });
  });

  it('should get all advices', function(done){
    request(app)
      .get('/api/advices')
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
        return done(err);
        }
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
