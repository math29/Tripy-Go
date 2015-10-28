'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Country = require('./country.model');

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

var fCountry = {
   country_code:'VG',
   country_name:'British Virgin Islands',
   currency_code:'USD',
   population:21730,
   capital:'Road Town',
   continent:'North America',
   area:153,
   languages:'en-VG'
 }

 var country = new Country({
   country_code:'VG',
   country_name:'British Virgin Islands',
   currency_code:'USD',
   population:21730,
   capital:'Road Town',
   continent:'North America',
   area:153,
   languages:'en-VG'
 });


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

describe('API /api/countries', function() {

  before(function(done) {
    // Clear users before testing
    Country.remove().exec().then(function() {
      done();
    });
  });

   afterEach(function(done) {
    Country.remove().exec().then(function() {
      done();
    });
  });

  it('should add a country', function(done){
    request(app)
      .post('/api/countries')
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send(fCountry)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it("shouldn't add the country", function(done){
    country.save().then(function(){
                request(app)
                  .post('/api/countries')
                  .set({'Authorization': 'Bearer '+tokenAdmin})
                  .send(fCountry)
                  .expect(202)
                  .expect('Content-Type', /json/)
                  .end(function(err, res){
                    if(err)return done(err);
                    res.body.should.be.instanceof(Object);
                    done();
                  });

          });
  });

  it("Simple users can't add country", function(done){
    request(app)
      .post('/api/countries')
      .set({'Authorization': 'Bearer '+token})
      .send(fCountry)
      .expect(403)
      .expect('Content-Type','text/html; charset=utf-8')
      .end(function(err, res){
        if(err)return done(err);
        done();
      });
  });

  it('should get error message when required param is not present', function(done){
    fCountry.country_name ="";
    request(app)
      .post('/api/countries')
      .set({'Authorization' : 'Bearer '+tokenAdmin})
      .send(fCountry)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        res.body.errors.length.should.be.above(0);
        done();
      });

  });

  it('should get a list of countries', function(done){
    country.save().then(function(){
    request(app)
          .get('/api/countries')
          .set({'Authorization': 'Bearer '+token})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
          });
          });
  });


  it('should respond with Unauthorized', function(done) {
    request(app)
      .get('/api/countries')
      .set({'Authorization': 'Barer '+token})
      .expect(401)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});

