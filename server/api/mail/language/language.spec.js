'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Language = require('./language.model');

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

var fLanguage = {
   code:'fr',
   name:'Français'
 }

 var language = new Language({
   code:'fr',
   name:'Français'
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

describe('API /api/languages', function() {

  before(function(done) {
    // Clear users before testing
    Language.remove().exec().then(function() {
      done();
    });
  });

   afterEach(function(done) {
    Language.remove().exec().then(function() {
      done();
    });
  });

  it('should add a language', function(done){
    request(app)
      .post('/api/languages')
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send(fLanguage)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it("shouldn't add the language", function(done){
    language.save().then(function(){
                request(app)
                  .post('/api/languages')
                  .set({'Authorization': 'Bearer '+tokenAdmin})
                  .send(fLanguage)
                  .expect(202)
                  .expect('Content-Type', /json/)
                  .end(function(err, res){
                    if(err)return done(err);
                    res.body.should.be.instanceof(Object);
                    done();
                  });

          });
  });

  it("Simple users can't add language", function(done){
    request(app)
      .post('/api/languages')
      .set({'Authorization': 'Bearer '+token})
      .send(fLanguage)
      .expect(403)
      .expect('Content-Type','text/html; charset=utf-8')
      .end(function(err, res){
        if(err)return done(err);
        done();
      });
  });

  it('should get error message when required param is not present', function(done){
    fLanguage.name ="";
    request(app)
      .post('/api/languages')
      .set({'Authorization' : 'Bearer '+tokenAdmin})
      .send(fLanguage)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        res.body.errors.length.should.be.above(0);
        done();
      });

  });

  it('should get a list of languages', function(done){
    language.save().then(function(){
    request(app)
          .get('/api/languages')
          .set({'Authorization': 'Bearer '+tokenAdmin})
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
      .get('/api/languages')
      .set({'Authorization': 'Bearer '+token})
      .expect(403)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});

