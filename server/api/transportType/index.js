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
 * @api {get} /api/transporttype/ Request list of all transports
 * @apiVersion 0.0.0
 * @apiName GetTransportTypes
 * @apiGroup TransportType
 *
 * @apiSuccess {Array} array of Transports
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
 *            "__v": 0,
 *            "name": "Voiture",
 *            "img": "http://tripy-go.fr/img/car.png",
 *            "_id": "564cf500bbb31f62475efc31"
 *       }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);

/**
 * @api {get} /api/transporttype/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetTransportsById
 * @apiGroup TransportType
 *
 * @apiParam {Number} id  Id of the target transport type
 *
 * @apiSuccess {Transport} Transport
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *            "__v": 0,
 *            "name":"Car",
 *            "img":"http://tripy-lib.fr/img/car.png
 *            "_id": "564cf500bbb31f62475efc31"
 *       }
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
router.post('/:name', auth.hasRole('admin'),controller.create);

/**
  * @api {put} /api/transports/:id Substitute a transportType
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
router.put('/:id', auth.hasRole('admin'),controller.update);

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
router.delete('/:id', auth.hasRole('admin'),controller.destroy);

module.exports = router;
