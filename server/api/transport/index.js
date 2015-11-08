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
 * @apiParam {String} name           Transport Name
 * @apiParam {Boolean} active        Activation
 * @apiParam {Place} departure       Place of departure
 * @apiParam {Place} arrival         Place of arrival
 * @apiParam {Number} cost           Cost of this transport
 * @apiParam {Date} duration         Duration of the transport
 * @apiParam {Date} departure_time   Date and time of the departure
 * @apiParam {Date} arrival_time     Date and time of the arrival
 */

/**
 * @api {get} /api/transports Request list of all Transports
 * @apiVersion 1.0.0
 * @apiName GetTransports
 * @apiGroup Transports
 *
 * @apiSuccess {Array} array of transports
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    {
 *      "name":"Plane to China",
 *      "active":True,
 *      "departure":{
 *			name: "France",
 *			active: True,
 *			coords: {
 *				longitude: 12.46546,
 *				latitude: 0.46544
 *			}
 *		},
 *		"arrival":{
 *			name: "China",
 *			active: True,
 *			coords: {
 *				longitude:5.46546,
 *				latitude: -12.46544
 *			}
 *		},
 *      "cost":654321,
 *      "duration":"1 Jan 2011, 02:03:04.567",
 *      "departure_time":"1 Jan 2011, 02:03:04.567",
 *      "arrival_time":"1 Jan 2011, 02:03:04.567"
 *    }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;