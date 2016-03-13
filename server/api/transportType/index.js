'use strict';

var express = require('express');
var controller = require('./transportType.controller');

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
 *  @apiDefine ApiParamsTransportType
 *
 *
 * @apiParam {String} name  Name given by the user to the transportType
 * @apiParam {String} img   Img given by the user to th transportType
 *
 */

/**
 * @api {get} /api/transports Request list of all transports
 * @apiVersion 0.0.0
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

/**
 * @api {get} /api/transports/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetTransportsById
 * @apiGroup Transports
 *
 * @apiParam {Number} id  Id of the target transport
 *
 * @apiSuccess {Transport} Transport
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
 *       }
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', controller.show);

/**
  * @api {post} /api/transportType/:name/ Insert a transportType
  * @apiName InsertTransportType
  * @apiGroup TransportType
  * @apiPermission admin
  * @apiHeader {Authorization} access-key Users unique access-key.
  *
  * @apiUse ApiParamsTransportType
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *            "__v": 0,
  *            "name": "Car",
  *            "img": "http://tripy-go/img/car.png",
  *            "_id": "564cf500bbb31f62475efc31"
  *       }
  *
  */
router.post('/:name', controller.create);

/**
  * @api {put} /api/transports/:id Substitute a transport
  * @apiName SubstituteTransport
  * @apiGroup Transports
  *
  * @apiUse ApiParamsTransport
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
//router.put('/:id', controller.update);

/**
  * @api {put} /api/transports/:id Update a transport
  * @apiName UpdateTransport
  * @apiGroup Transports
  *
  * @apiUse ApiParamsTransport
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
//router.patch('/:id', controller.update);

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
//router.delete('/:id', controller.destroy);

module.exports = router;
