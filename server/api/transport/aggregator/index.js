'use strict';

var express = require('express');
var controller = require('./aggregator.controller');

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
 *  @apiDefine ApiParamsAgregator
 *
 *
 */

/**
 * @api {get} /api/transports Request list of all transports
 * @apiVersion 0.0.0
 * @apiName GetTransportsStats
 * @apiGroup Aggregator
 *
 * @apiSuccess {Array} stats on transports
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *    "_id" : ObjectId("5713f93d4750878b10c81a31"),
 *      "avg_cost" : 0,
 *      "avg_dist" : 0,
 *      "dest" : [ ObjectId("5713f93d4750878b10c81a32") ]
 *    },
 *    {
 *    "_id" : ObjectId("5713f8fb4750878b10c81a2c"),
 *    "avg_cost" : 200,
 *    "avg_dist" : 1000,
 *    "dest" : [ ObjectId("5713f8fb4750878b10c81a2d") ]
 *    }
 *    ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);

module.exports = router;
