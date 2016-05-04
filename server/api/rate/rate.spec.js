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
var rate_stack_id;
var rate_stars_id;

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
    rate_stack.save(function(){
      rate_stars.save(function(){
        done();
      });
    });
  });

   afterEach(function(done) {
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

        res.body.should.be.instanceof(Array);
        console.log(res.body);
        /*var body = {body: JSON.parse(JSON.stringify(res.body))};
        console.log(body.body.length);*/
        //body.length.should.be.equals(1);
        done();
      });
  });

  /*it("Simple users can't add operation", function(done){
    request(app)
      .post('/api/operations/'+fOperation.title)
      .set({'Authorization': 'Bearer '+token})
      .send({content:fOperation})
      .expect(403)
      .expect('Content-Type','text/html; charset=utf-8')
      .end(function(err, res){
        if(err)return done(err);
        done();
      });
  });

  it('should get error message when required param is not present', function(done){
    fOperation.title ="";
    request(app)
      .post('/api/operations/test')
      .set({'Authorization' : 'Bearer '+tokenAdmin})
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        res.body.errors.length.should.be.above(0);
        done();
      });

  });

  it('should get a list of operations', function(done){
      operation.save().then(function(data){
          request(app)
                .get('/api/operations')
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
      .get('/api/operations')
      .set({'Authorization': 'Bearer '+token})
      .expect(403)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });*/

});
