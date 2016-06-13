'use strict';

var express = require('express');
var controller = require('./newsletter.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

/**
 * @apiDefine UserNotAuthorized
 *
 * @apiError User not authenticated
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 *  UnauthorizedError
 */

/**
  * @api {post} /api/subscribe Subscribe to newsletter
  * @apiName Subscribe
  * @apiGroup Languages
  *
  * @apiUse ApiParams
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *         "ok":1,
  *         "nModified":0,
  *         "upserted":[
  *           {
  *             "index":0,
  *             "_id":"34347838758deb5"
  *           }
  *         ]
  *     }
  *
  */
router.post('/', controller.create);

router.get('/', auth.hasRole('admin'), controller.getAll);

module.exports = router;
