'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Operation = require('../operation/operation.model');
var Rate = require('../rate/rate.model');
var Timeline = require('./timeline.model')

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

var fOperation = {
   title:'test',
   step:1,
   content:'contenu'
 }

var rate = new Rate({score:0});

 var operation = new Operation({
  type:'Advice',
  title:'test',
  step:1,
  content:'contenu'
 });
operation.save();

var token = "";
var tokenAdmin = "";


simpleUser.save(function(){
      request(app).post('/auth/local')
        .send(sUser).end(function(err, res){
          token = res.body.token;
        });
 });

rate.save(function(rates){
  operation.rate = rate._id;
});

adminUser.save(function(){
  request(app)
    .post('/auth/local')
    .send(adminJS)
    .end(function(err, res){
    tokenAdmin = res.body.token;
  });
});



var timeline = new Timeline({
  name:'Timeline test',
  description:'Description de la timeline',
  operations:[]
});

describe('API /api/timeline', function() {


  it('should add a new Timeline', function(done){
    request(app)
      .post('/api/timeline/'+timeline.name)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send({'description':timeline.description})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        timeline._id = res.body._id;
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it("Simple users can't add new Timeline", function(done){
  request(app)
        .post('/api/timeline/'+timeline.name)
        .set({'Authorization': 'Bearer '+token})
        .send({'description':timeline.description})
        .expect(403)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(function(err, res){
          if(err)return done(err);
          done();
        });
  });

  it('should add an operation to the timeline', function(done){
    request(app)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .post('/api/timeline/add/'+timeline._id+'/'+operation._id)
      .send()
      .expect(202)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should remove an operation to the timeline', function(done){
      request(app)
        .post('/api/timeline/remove/'+timeline._id+'/'+operation._id)
        .set({'Authorization' : 'Bearer '+tokenAdmin})
        .send()
        .expect(202)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.should.be.instanceof(Object);
          done();
        });

    });

});
