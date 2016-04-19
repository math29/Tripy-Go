'use strict';

var _ = require('lodash');
/*var mongo = require('mongodb');
var config = require('../../config/environment');
var assert = require('assert');
var mongoClient = mongo.MongoClient;*/


// Get list of transports
exports.index = function(req, res) {

  return res.status(200).send("[]");
};

function handleError(res, err) {
  return res.status(500).send(err);
}
