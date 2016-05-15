'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Promo = require('./promo.model');

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
describe('API /api/promo', function() {

  after(function(done) {
    Promo.remove({}).exec().then(function(){
      done();
    });
  });
  
  it('should create a promo', function(done) {
    request(app)
      .post('/api/promos')
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send(
        {
    "type": "transport",
    "url": "https://google.com",
    "vendor": "Google",
    "discount": 50,
    "initial_price": 1000,
    "end_date": "Wed, 18 May 2016 18:58:15 GMT",
    "img":"http://vignette4.wikia.nocookie.net/desencyclopedie/images/2/26/Sourire_de_biquette.jpg/revision/latest?cb=20090902212908"
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

  it('should get all promos actives', function(done){
    request(app)
      .get('/api/promos')
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
