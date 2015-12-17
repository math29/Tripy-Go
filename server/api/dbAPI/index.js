'use strict';

var express = require('express');
var controller = require('./dbAPI.controller');
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
 * @api {get} /api/back/db Request stats of mongo database
 * @apiVersion 1.0.0
 * @apiName GetStats
 * @apiGroup MongoDB
 *
 * @apiSuccess {Object} mongoDB stats
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 *    {
 *      "collections":8,
 *      "avgObjectSize":268.5678,
 *        ...
 *    }
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/',  auth.hasRole('admin'),controller.stats);

/**
 * @api {get} /api/back/db/names Request list of mongo collections names
 * @apiVersion 1.0.0
 * @apiName GetCollectionNames
 * @apiGroup MongoDB
 *
 * @apiSuccess {Array} mongoDB collection names
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 *    ['logs','users',...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/names', auth.hasRole('admin'),controller.getCollectionNames);

/**
 * @api {get} /api/back/db/stats Request stats of all mongo collections
 * @apiVersion 1.0.0
 * @apiName GetAllStats
 * @apiGroup MongoDB
 *
 * @apiSuccess {Array} mongoDB stats
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    [
 *    { ns: 'locations',
 *         count: 0,
 *         size: 0,
 *         numExtents: 1,
 *         storageSize: 8192,
 *         lastExtentSize: 8192,
 *         paddingFactor: 1,
 *         paddingFactorNote: 'paddingFactor is unused and unmaintained in 3.0. It remains hard coded to 1.0 for compatibility only.',
 *         userFlags: 1,
 *         capped: false,
 *         nindexes: 2,
 *         indexDetails: {},
 *         totalIndexSize: 16352,
 *         indexSizes: { _id_: 8176, loc_2d: 8176 },
 *         ok: 1 },
 *        ...
 *        ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/stats',  auth.hasRole('admin'),controller.allStats);

/**
 * @api {get} /api/back/db/hostInfos Request host informations
 * @apiVersion 1.0.0
 * @apiName GetHostInfos
 * @apiGroup MongoDB
 *
 * @apiSuccess {Object} mongoDB host informations
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {"system":
 *       {"currentTime":"2015-12-17T00:14:26.193Z",
 *        "hostname":"MBP-0x42.local",
 *        "cpuAddrSize":64,
 *        "memSizeMB":8192,
 *        "numCores":4,
 *        "cpuArch":"x86_64\u0000",
 *        "numaEnabled":false},
 *       "os":{
 *          "type":"Darwin",
 *          "name":"Mac OS X",
 *          "version":"15.2.0\u0000"},
 *        ok":1}
 *
 * @apiUse UserNotAuthorized
 */
router.get('/hostInfos', auth.hasRole('admin'), controller.hostInfos);

/**
 * @api {get} /api/back/db/status Request host status
 * @apiVersion 1.0.0
 * @apiName GetHostStatus
 * @apiGroup MongoDB
 *
 * @apiSuccess {Object} mongoDB host status
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {"host":"MBP-0x42.local",
 *      "version":"3.0.7",
 *      "process":"mongod",
 *      "pid":5486,
 *      "uptime":29963,
 *      "uptimeMillis":29963101,
 *      "uptimeEstimate":15411,
 *      "localTime":"2015-12-17T00:17:09.164Z",
 *      "asserts":{
 *        "regular":0,
 *        "warning":0,
 *        "msg":0,
 *        "user":4,
 *        "rollovers":0},
 *      ...}
 *
 * @apiUse UserNotAuthorized
 */
router.get('/status', auth.hasRole('admin'), controller.serverStatus);


module.exports = router;
