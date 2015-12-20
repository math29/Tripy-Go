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
 * @api {get} /api/operation Request list of all operations
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
 * @api {get} /api/operation/:id Request operations with specific ID
 * @apiParam{Number} id of operation
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
router.get('/:id', auth.isAuthenticated() , controller.show);

/**
 * @api {post} /api/operation/:title/:step create an operation
 * @apiParam {String} title  title of operation
 * @apiParam {Number} step step of operation
 * @apiParam {String} body  content of operation
 * @apiVersion 1.0.0
 * @apiName CreateOperation
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
 *      content: "#Title\n\tText",
 *      rate: 567876543
 *      _id:56789854879
 *    }
 *
 * @apiUse UserNotAuthorized
 */
router.post('/:title/:step',  controller.create);

/**
 * @api {put} /api/operation/:id/:title/:step update an operation
 * @apiParam {Number} id of operation
 * @apiParam {String} title  title of operation
 * @apiParam {Number} step step of operation
 * @apiParam {String} body  content of operation
 * @apiVersion 1.0.0
 * @apiName CreateOperation
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
 *      content: "#Title\n\tText",
 *      _id:56789854879
 *    }
 *
 * @apiUse UserNotAuthorized
 */
router.put('/:id/:title/:step', auth.hasRole('admin'),controller.update);


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
router.delete('/:id', auth.hasRole('admin'),controller.destroy);

module.exports = router;
