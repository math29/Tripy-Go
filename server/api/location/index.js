'use strict';

var express = require('express');
var controller = require('./location.controller');

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
 *  @apiDefine ApiParamsLocations
 *
 *
 * @apiParam {String} name                      Name of the location
 * @apiParam {Geospatial} loc 			 		Geospatial location with mongoose ([longitude, latitude])
 */

/**
 * @api {get} /api/locations Request list of all locations
 * @apiVersion 1.0.0
 * @apiName GetLocations
 * @apiGroup Locations
 *
 * @apiSuccess {Array} array of Locations
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    {
 *      "name":"Paris",
 *      "loc":[1.024115, 15.024115]
 *    }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);

/**
  * @api {get} /api/locations/:id Request location by id
  * @apiName GetById
  * @apiGroup Locations
  *
  * @apiParam {Number} id  Id of the Location searched
  *
  * @apiSuccess {Location} Location
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 Success-Response:
  *   [
  *      {
  *		    "_id": "564ceb9ca91ae0a62fbda592",
  *		    "name": "Paris",
  *		    "loc": [
  *		        4.5456,
  *		        5.4648
  *		    ],
  *		    "__v": 0
  *		}
  *    ]
  *
  *
  */
router.get('/:id', controller.show);

/**
  * @api {get} /api/locations/:longitude/:latitude/:distance/:limit Request Locations arround a given Location
  * @apiName GetArroundLocation
  * @apiGroup Locations
  *
  * @apiParam {Number} longitude 	Longitude of the central Location
  * @apiParam {Number} latitude 	Latitude of the central Location
  * @apiParam {Number} distance 	Distance maximum arround the given Location
  * @apiParam {Number} limit 		Limit of results
  *
  * @apiSuccess {Array} Array of Locations
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 Success-Response:
  *   [
  *      {
  *		    "_id": "564ceb9ca91ae0a62fbda592",
  *		    "name": "Paris",
  *		    "loc": [
  *		        4.5456,
  *		        5.4648
  *		    ],
  *		    "__v": 0
  *		},
  *    ...
  *    ]
  *
  *
  */
router.get('/:longitude/:latitude/:distance/:limit', controller.findLocation);

/**
  * @api {post} /api/locations Insert a location
  * @apiName InsertLocation
  * @apiGroup Locations
  *
  * @apiUse ApiParamsLocations
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *		    "__v": 0,
  *		    "name": "Paris",
  *		    "loc": [
  *		        4.5456,
  *		        5.4648
  *		    ],
  *		    "_id": "564ceb9ca91ae0a62fbda592"
  *		}
  *
  */
router.post('/', controller.create);

/**
  * @api {put} /api/locations Substitute a location
  * @apiName SubstituteLocation
  * @apiGroup Locations
  *
  * @apiUse ApiParamsLocations
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

/**
  * @api {patch} /api/locations Update a location
  * @apiName UpdateLocation
  * @apiGroup Locations
  *
  * @apiUse ApiParamsLocations
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
  * @api {delete} /api/locations/:id Delete a country
  * @apiName DeleteLocation
  * @apiGroup Locations
  *
  * @apiParam {Number} id 	Id of the Location you want to delete
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