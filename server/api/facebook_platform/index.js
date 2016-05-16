'use strict';

var express = require('express');
var controller = require('./facebook.controller');
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
 * @api {post} /api/facebook/:id add a messenger user
 * @apiParam {String} id  messenger platfrom id of the user
 * @apiVersion 1.0.0
 * @apiName CreateOperation
 * @apiGroup Operations
 *
 * @apiSuccess {Object} operation
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 * @apiUse UserNotAuthorized
 */
router.post('/:id', controller.create);


/**
 * @api {delete} /api/operation/:id delete operation with specific ID
 * @apiParam {Number} id of operation
 * @apiVersion 1.0.0
 * @apiName DeleteOperation
 * @apiGroup Operations
 *
 * @apiSuccess {Object} operation
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 204 No content
 *
 *
 * @apiUse UserNotAuthorized
 */
router.delete('/:id', controller.destroy);

module.exports = router;
