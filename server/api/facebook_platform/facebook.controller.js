'use strict';

var logger = require('../../config/logger');
var Facebook = require('./facebook.model');
var TAG = "FacebookController";



/* Create an operation */
exports.create = function(req, res){
  /* Get parameters */
  let id = req.params.id;

  let fbUser = new Facebook({uid:id});

  fbUser.save(function(err, op){
    /* if there is an error, delete  created rate */
    if(err){
      logger.error('can\'t create operation');
      return res.status(400).json('{error:"can\'t create user: '+err+'"}');
    }
    return res.status(201).json(op);
  });

};


/**
 * Removed specified operation from database
 */
exports.destroy = function(req, res) {
  Facebook.findOne({uid: req.params.id}, function(err, operation){
    if(err){
      return handleError(res, err);
    }
    operation.remove();
    return res.status(204).json('{success: \'No content\'}');

  });
};
