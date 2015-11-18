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
 *  @apiDefine ApiParams
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
 *    {
 *      "Name":"Intern Transport",
 *      "active":true,
 *      "departure":{
 *			name: String,
 * 			loc: [12.15564, 14.46466]
 *		},
 *      "arrival":{
 *			name: String,
 * 			loc: [0.15564, 1.46466]
 *		},
 *      "cost":15426.3,
 *      "duration":{
 *			
 *		},
 *      "departure_time":389,
 *      "arrival_time":"en-VC,fr",
 *      "travel":"en-VC,fr",
 *      "walking_time":"en-VC,fr",
 *      "baggages":"en-VC,fr",
 *      "confort":"en-VC,fr",
 *    }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);
router.get('/:id', controller.show);

/**
  * @api {post} /api/transports Insert a transport in database
  * @apiName InsertTransport
  * @apiGroup Transports
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

/**
  * @api {put} /api/transports Update a transport in database
  * @apiName UpdateTransport
  * @apiGroup Transports
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
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;