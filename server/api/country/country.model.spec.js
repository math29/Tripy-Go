'use strict';

var should = require('should');
var app = require('../../app');
var Country = require('./country.model');

var country = new Country({
  country_code:"CO",
  country_name:"Country",
  currency_code:"EUR",
  population: 666,
  capital:"Capital",
  continent:"Europe",
  area:"666",
  languages:"fr"
});

describe('country_model', function() {
  before(function(done) {
    // Clear countries before testing
    Country.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Country.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no countries', function(done) {
    Country.find({}, function(err, countries) {
      countries.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate countries', function(done) {
    country.save(function() {
      var countryDup = new Country(country);
      countryDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a country code', function(done) {
    country.country_code = '';
    country.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a country name', function(done) {
      country.country_name = '';
      country.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should fail when saving without a continent', function(done) {
        country.continent = '';
        country.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should fail when saving without a area', function(done) {
          country.area = '';
          country.save(function(err) {
            should.exist(err);
            done();
          });
        });

/*
  it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
  */
});
