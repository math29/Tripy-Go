'use strict';

var express = require('express');
var controller = require('./timeline.controller');
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
 * @api {get} /api/timeline Request list of all timelines
 * @apiVersion 1.0.0
 * @apiName GetTimelines
 * @apiGroup Timelines
 *
 * @apiSuccess {Array} array of timelines
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.hasRole('admin'), controller.index);

/**
 * @api {get} /api/timeline/:navigation Request timeline for specified navigation
 * @apiVersion 1.0.0
 * @apiName GetTimeline
 * @apiGroup Timelines
 *
 * @apiSuccess {Object} object of timeline
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/:name', auth.hasRole('admin'), controller.create);

router.post('/add/:timelineId/:operationId',  auth.hasRole('admin'), controller.addOperation);
router.post('/remove/:timelineId/:operationId',  auth.hasRole('admin'), controller.removeOperation);

/**
  * @api {delete} /api/timeline/:id Delete a timeline
  * @apiName DeleteTimeline
  * @apiGroup Timelines
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

module.exports = router;
