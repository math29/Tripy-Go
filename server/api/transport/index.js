'use strict';

var express = require('express');
var controller = require('./transport.controller');

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
 *  @apiDefine ApiParamsTransports
 *
 *
 * @apiParam {String} Name 			 			Name given by the user to the transport
 * @apiParam {Boolean} active   	 			Indicate if the transport is active or not
 * @apiParam {Location} departure    			Departure location of the transport
 * @apiParam {Location} arrival      			Arrival location of the transport
 * @apiParam {Number} cost      	 			Cost of the transport
 * @apiParam (duration) {Date} start_date   	Two Dates to represent the duration of the transport
 * @apiParam (duration) {Date} end_date   		Two Dates to represent the duration of the transport
 * @apiParam {Date} departure_time	 			Departure time
 * @apiParam {Date} arrival_time	 			Arrival time
 * @apiParam {Travel} travel	 	 			The transport belong to a travel
 * @apiParam (walking_time) {Date} start_date   Date of the beginning of walking time from previous step to this transport - Only for Intern Transports
 * @apiParam (walking_time) {Date} end_date   	Date of the end of walking time from previous step to this transport - Only for Intern Transports
 * @apiParam {String} baggages	 				Size of baggages : SMALL/MEDIUM/LARGE - Only for external Transports
 * @apiParam {Number} confort	 				confort of the transport : 1 -> 5 - Only for external Transports
 */

/**
 * @api {get} /api/transports Request list of all transports
 * @apiVersion 1.0.0
 * @apiName GetTransports
 * @apiGroup Transports
 *
 * @apiSuccess {Array} array of Transports
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
 *            "__v": 0,
 *            "active": true,
 *            "departure": "564ceecea3300dfc3906f536",
 *            "arrival": "564ceecea3300dfc3906f536",
 *            "cost": 15426.3,
 *            "departure_time": "1970-01-01T00:00:00.389Z",
 *            "arrival_time": "2015-09-07T19:50:05.708Z",
 *            "travel": "201500090700095000057008",
 *            "baggages": "MEDIUM",
 *            "confort": 1,
 *            "_id": "564cf500bbb31f62475efc31"
 *       }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);
router.get('/:id', controller.show);

/**
  * @api {post} /api/transports Insert a transport
  * @apiName InsertTransport
  * @apiGroup Transports
  *
  * @apiUse ApiParamsCountry
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *            "__v": 0,
  *            "active": true,
  *            "departure": "564ceecea3300dfc3906f536",
  *            "arrival": "564ceecea3300dfc3906f536",
  *            "cost": 15426.3,
  *            "departure_time": "1970-01-01T00:00:00.389Z",
  *            "arrival_time": "2015-09-07T19:50:05.708Z",
  *            "travel": "201500090700095000057008",
  *            "baggages": "MEDIUM",
  *            "confort": 1,
  *            "_id": "564cf500bbb31f62475efc31"
  *       }
  *
  */
router.post('/', controller.create);

/**
  * @api {put} /api/transports Substitute a transport
  * @apiName SubstituteTransport
  * @apiGroup Transports
  *
  * @apiUse ApiParamsCountry
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *          "__v": 0,
  *          "_id": "564cf49161e7bc8345166168"
  *      }
  *
  */
router.put('/:id', controller.update);

/**
  * @api {put} /api/transports Update a transport
  * @apiName UpdateTransport
  * @apiGroup Transports
  *
  * @apiUse ApiParamsCountry
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
router.patch('/:id', controller.update);

/**
  * @api {delete} /api/transports/:id Delete a transport
  * @apiName DeleteTransport
  * @apiGroup Transports
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 204 No Content:
  *      {
  *     }
  *
  */
router.delete('/:id', controller.destroy);

module.exports = router;