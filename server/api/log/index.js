'use strict';

var express = require('express');
var controller = require('./log.controller');
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
 * @api {get} /api/back/log Request list of all logs
 * @apiVersion 1.0.0
 * @apiName GetLogs
 * @apiGroup Logs
 *
 * @apiSuccess {Object} object of logs and stats about it
 *
 * Avoid to use this call, prefer GetLogsPaginated
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    stats: {
 *      labels: ['info','warn', 'error'],
 *      data: [0,1,2]
 *    },
 *    logs: [
 *      {
 *      "message":"message",
 *      "timestamp":"2015-12-17",
 *      "level":"info",
 *      "meta":{}
 *    }, ...
 *    ]
 *  }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.hasRole('admin'), controller.index);

/**
 * @api {get} /api/back/log/:page Request list of all logs paginate by 50 entries
 * @apiVersion 1.0.0
 * @apiName GetLogsPaginated
 * @apiGroup Logs
 *
 * @apiSuccess {Object} object of logs and stats about it paginated by 50 entries
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    stats: {
 *      labels: ['info','warn', 'error'],
 *      data: [0,1,2]
 *    },
 *    logs: [
 *      {
 *      "message":"message",
 *      "timestamp":"2015-12-17",
 *      "level":"info",
 *      "meta":{}
 *    }, ...
 *    ]
 *  }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:level/:page', auth.hasRole('admin'), controller.paginated);

router.get('/:level/:page/:message', auth.hasRole('admin'), controller.paginated);



/**
  * @api {delete} /api/log/:id Delete a log entry
  * @apiName DeleteLog
  * @apiGroup Log
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 204 No Content:
  *      {
  *     }
  *
  */
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

/**
  * @api {delete} /api/log/ Drop log table
  * @apiName DropLogs
  * @apiGroup Log
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 204 No Content:
  *      {
  *     }
  *
  */
router.delete('/', auth.hasRole('adminInfo'), controller.drop);

module.exports = router;
