'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Rate = require('../rate/rate.model');

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
   content:'contenu',
   steps: []
 }

var rate_stack = new Rate({score:0, raters:[], type:'Stack'});
var rate_stars = new Rate({score:0, raters:[], type:'Stars'});

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
describe('API /api/rate', function() {

  before(function(done) {
    // Clear users before testing
    rate_stack = new Rate({score:0, raters:[], type:'Stack'});
    rate_stars = new Rate({score:0, raters:[], type:'Stars'});
    rate_stack.save(function(){
      rate_stars.save(function(){
        done();
      });
    });
  });

   after(function(done) {
     Rate.remove({}).exec().then(function(){
       done();
     });
  });

  it('should get all rates', function(done){
    request(app)
      .get('/api/rate/')
      .set({'Authorization': 'Bearer '+tokenAdmin})
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

  it('Simple user shouldn\'t get all rates', function(done){
    request(app)
      .get('/api/rate/')
      .set({'Authorization': 'Bearer '+token})
      .send()
      .expect(403)
      .end(function(err, res){
        if(err){
        return done(err);
        }
        done();
      });
  });

  it('should get Stack rate', function(done){
    request(app)
      .get('/api/rate/'+ rate_stack._id)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stack');
        res.body.score.should.be.equal(0);
        res.body.raters.length.should.be.equal(0);
        done();
      });
  });

  it('simple user should get Stack rate', function(done){
    request(app)
      .get('/api/rate/'+ rate_stack._id)
      .set({'Authorization': 'Bearer '+token})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stack');
        res.body.score.should.be.equal(0);
        res.body.raters.length.should.be.equal(0);
        done();
      });
  });

  it('should get Stars rate', function(done){
    request(app)
      .get('/api/rate/'+ rate_stars._id)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stars');
        res.body.score.should.be.equal(0);
        res.body.raters.length.should.be.equal(0);
        done();
      });
  });

  it('simple user should get Stars rate', function(done){
    request(app)
      .get('/api/rate/'+ rate_stars._id)
      .set({'Authorization': 'Bearer '+token})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stars');
        res.body.score.should.be.equal(0);
        res.body.raters.length.should.be.equal(0);
        done();
      });
  });

  it('should Vote up stack rate', function(done){
    request(app)
      .post('/api/rate/vote/up/'+ rate_stack._id)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stack');
        res.body.score.should.be.equal(1);
        res.body.raters.length.should.be.equal(1);
        //res.body.raters[0].user.should.be.equal(adminUser._id);
        res.body.raters[0].action.should.be.equal(1);
        done();
      });
  });

  it('simple user should Vote up stack rate', function(done){
    request(app)
      .post('/api/rate/vote/up/'+ rate_stack._id)
      .set({'Authorization': 'Bearer '+token})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stack');
        res.body.score.should.be.equal(2);
        res.body.raters.length.should.be.equal(2);
        //res.body.raters[0].user.should.be.equal(adminUser._id);
        res.body.raters[1].action.should.be.equal(1);
        done();
      });
  });

  it('should Vote down stack rate', function(done){
    request(app)
      .post('/api/rate/vote/down/'+ rate_stack._id)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stack');
        res.body.score.should.be.equal(0);
        res.body.raters.length.should.be.equal(2);
        //res.body.raters[0].user.should.be.equal(adminUser._id);
        res.body.raters[0].action.should.be.equal(-1);
        done();
      });
  });

  it('simple user should Vote down stack rate', function(done){
    request(app)
      .post('/api/rate/vote/down/'+ rate_stack._id)
      .set({'Authorization': 'Bearer '+token})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stack');
        res.body.score.should.be.equal(-2);
        res.body.raters.length.should.be.equal(2);
        //res.body.raters[0].user.should.be.equal(adminUser._id);
        res.body.raters[1].action.should.be.equal(-1);
        done();
      });
  });

  it('should Vote up stars rate', function(done){
    request(app)
      .post('/api/rate/vote/5/'+ rate_stars._id)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stars');
        res.body.score.should.be.equal(5);
        res.body.raters.length.should.be.equal(1);
        //res.body.raters[0].user.should.be.equal(adminUser._id);
        res.body.raters[0].action.should.be.equal(5);
        done();
      });
  });

  it('should Vote down stars rate', function(done){
    request(app)
      .post('/api/rate/vote/1/'+ rate_stars._id)
      .set({'Authorization': 'Bearer '+tokenAdmin})
      .send()
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err)return done(err);
        res.body.should.be.instanceof(Object);
        res.body.type.should.be.equal('Stars');
        res.body.score.should.be.equal(1);
        res.body.raters.length.should.be.equal(1);
        //res.body.raters[0].user.should.be.equal(adminUser._id);
        Number(res.body.raters[0].action).should.be.equal(1);
        done();
      });
  });

});
