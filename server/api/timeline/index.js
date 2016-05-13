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
 * @api {get} /api/timeline/:name Get Timeline by name
 * @apiVersion 1.0.0
 * @apiName GetTimelines
 * @apiGroup Timelines
 *
 * @apiSuccess {Object} timeline requested
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 *
 * @apiUse UserNotAuthorized
 */
router.get('/name/:name', auth.isAuthenticated(), controller.getByName);

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
router.patch('/:timelineId/:name', auth.hasRole('admin'), controller.updateName);

router.post('/add/:timelineId/:operationId',  auth.hasRole('admin'), controller.addOperation);
router.post('/remove/:timelineId/:operationId',  auth.hasRole('admin'), controller.removeOperation);


/**
  * @api {put} /api/timeline/:side/:timelineId/:opId Move operation in the timeline
  * @apiName MoveOperation
  * @apiGroup Timelines
  *
  * @apiParam (side) {Number} side to move operation -1 appears before 1 appears after
  * @apiParam (timelineId) {String} id of the timeline
  * @apiParam (opId) {String} id of operation
  *
  * @apiSuccess {Object} old timeline
  *
  *
  */
router.put('/:side/:timelineId/:opId', auth.hasRole('admin'), controller.moveOperation);
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
