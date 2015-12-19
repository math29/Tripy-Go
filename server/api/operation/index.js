'use strict';

var express = require('express');
var controller = require('./operation.controller');
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
 * @api {get} /api/back/operation Request list of all operations
 * @apiVersion 1.0.0
 * @apiName GetOperations
 * @apiGroup Operations
 *
 * @apiSuccess {Array} array of operations
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    {
 *      type:"Advice",
 *      title: "Test",
 *      step: 1,
 *      content: "#Title\n\tText"
 *    },
 *    ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.hasRole('admin'), controller.index);

/**
 * @api {get} /api/back/operation/:id Request operations with specific ID
 * @apiVersion 1.0.0
 * @apiName GetOperation
 * @apiGroup Operations
 *
 * @apiSuccess {Object} operation
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      type:"Advice",
 *      title: "Test",
 *      step: 1,
 *      content: "#Title\n\tText"
 *    }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/:title/:step',  controller.create);



/**
 * @api {delete} /api/back/operation/:id delete operation with specific ID
 * @apiVersion 1.0.0
 * @apiName DeleteOperation
 * @apiGroup Operations
 *
 * @apiSuccess {Object} operation
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 *
 * @apiUse UserNotAuthorized
 */
router.delete('/:id', controller.destroy);

module.exports = router;
