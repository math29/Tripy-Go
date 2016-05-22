'use strict';

var express = require('express');
var controller = require('./comparators.controller');
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
 *  @apiDefine ApiParamsComparator
 *
 *
 * @apiParam {ObjectId} company 			 			Company id of the comparator
 * @apiParam {[ObjectId]} types             Types transport of comparator
 *
 */

/**
 * @api {get} /api/comparators Request list of all comparators
 * @apiVersion 0.0.0
 * @apiName GetComparators
 * @apiGroup Comparator
 *
 * @apiSuccess {Array} array of comparators
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
 *            "__v": 0,
 *            "company": {
 *              _id:'564ceecea3300dfc3906f536',
 *              name: 'Liligo',
 *              url: 'https://liligo.com'
 *            },
 *            types: [
 *              {
 *               _id:'564ceecea3300dfc3906f536',
 *               name: 'Plane',
 *               image: '564ceecea3300dfc3906f536'
 *              },
 *              ...
 *            ]
 *            "_id": "564cf500bbb31f62475efc31"
 *       }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.isAuthenticated(), controller.index);


/**
 * @api {get} /api/comparators/search/:name Search comparator
 * @apiVersion 0.0.1
 * @apiName SearchComparator
 * @apiGroup Comparator
 *
 * @apiParam {String} name name of the comparator
 *
 * @apiSuccess {Comparator} Comparator
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *    [
 *      {
 *            "__v": 0,
 *            "company": {
 *              _id:'564ceecea3300dfc3906f536',
 *              name: 'Liligo',
 *              url: 'https://liligo.com'
 *            },
 *            types: ['transport'],
 *            transport: {
 *              types: [
 *                {
 *                _id:'564ceecea3300dfc3906f536',
 *                name: 'Plane',
 *                image: '564ceecea3300dfc3906f536'
 *                },
 *                ...
 *              ]
 *              "_id": "564cf500bbb31f62475efc31",
 *              content_rate: {_id: '564ceecea3300dfc3906f536', score: 0, raters: []},
 *              ergo_rate: {_id: '564ceecea3300dfc3906f536', score: 0, raters: []},
 *              comments: []
 *          }
 *       }
 *    ]
 *
 * @apiUse UserNotAuthorized
 **/
router.get('/search/:name', auth.isAuthenticated(), controller.search);

/**
 * @api {get} /api/comparators/:id Get By Id
 * @apiVersion 0.0.1
 * @apiName GetComparatorById
 * @apiGroup Comparator
 *
 * @apiParam {String} id  Id of the target comparator
 *
 * @apiSuccess {Comparator} Comparator
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *            "__v": 0,
 *            "company": {
 *              _id:'564ceecea3300dfc3906f536',
 *              name: 'Liligo',
 *              url: 'https://liligo.com'
 *            },
 *            types: ['transport'],
 *            transport: {
 *              types: [
 *                {
 *                _id:'564ceecea3300dfc3906f536',
 *                name: 'Plane',
 *                image: '564ceecea3300dfc3906f536'
 *                },
 *                ...
 *              ]
 *              "_id": "564cf500bbb31f62475efc31",
 *              content_rate: {_id: '564ceecea3300dfc3906f536', score: 0, raters: []},
 *              ergo_rate: {_id: '564ceecea3300dfc3906f536', score: 0, raters: []},
 *              comments: []
 *          }
 *       }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', auth.isAuthenticated(), [controller.show, controller.findByType]);
/**
 * @api {get} /api/comparators/:type Get By type
 * @apiVersion 0.0.1
 * @apiName GetComparatorByType
 * @apiGroup Comparator
 *
 * @apiParam {String} type  Type of the target comparator
 *
 * @apiSuccess {Array[Comparator]} Comparators
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    [
 *      {
 *            "__v": 0,
 *            "company": {
 *              _id:'564ceecea3300dfc3906f536',
 *              name: 'Liligo',
 *              url: 'https://liligo.com'
 *            },
 *            types: ['transport'],
 *            transport: {
 *              types: [
 *                {
 *                _id:'564ceecea3300dfc3906f536',
 *                name: 'Plane',
 *                image: '564ceecea3300dfc3906f536'
 *                },
 *                ...
 *              ]
 *              "_id": "564cf500bbb31f62475efc31",
 *              content_rate: {_id: '564ceecea3300dfc3906f536', score: 0, raters: []},
 *              ergo_rate: {_id: '564ceecea3300dfc3906f536', score: 0, raters: []},
 *              comments: []
 *          }
 *       }
 *    ]
 *
 * @apiUse UserNotAuthorized
 */

/**
 * @api {get} /api/comparators/comments/:type/:id/:limit/:offset Get Comments By Id with offset
 * @apiVersion 0.0.1
 * @apiName GetComparatorCommentsById
 * @apiGroup Comparator
 *
 * @apiParam {Number} id  Id of the target comparator transport
 * @apiParam {Number} offset  Offset of the comment wanted
 * @apiParam {Number} limit  Number of comments wanted from the offset
 *
 * @apiSuccess {Comparator} Comparator
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    [
 *      {
 *      "comment":"hahahahahahahahahahahahaha",
 *      "user": {
 *        "_id":"5741c1c7fe4b79f8034c2017",
 *        "name":"Test User",
 *        "__v":0,
 *        "travels":[],
 *        "role":"user"
 *      },
 *      "rate": {
 *        "_id":"5741c1c8fe4b79f8034c2122",
 *        "score":0,
 *        "type":"Stack",
 *        "__v":0,
 *        "raters":[]
 *      },
 *    "_id":"5741c1c8fe4b79f8034c2126"
 *    },
 *    {
 *      "comment":"Très bon ",
 *      "user":{
 *        "_id":"5741c1c7fe4b79f8034c2017",
 *        "name":"Test User",
 *        "__v":0,
 *        "travels":[],
 *        "role":"user"
 *      },
 *      "rate": {
 *        "_id":"5741c1c8fe4b79f8034c2123",
 *        "score":0,
 *        "type":"Stack",
 *        "__v":0,
 *        "raters":[]
 *      },
 *      "_id":"5741c1c8fe4b79f8034c2125"
 *    }
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/comments/:type/:id/:limit/:offset', auth.isAuthenticated(), controller.getComments);

/**
  * @api {post} /api/comparators Insert a comparator
  * @apiName InsertTransportComparator
  * @apiGroup Comparator
  *
  * @apiUse ApiParamsTransport
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *            "__v": 0,
  *            "_id": "564cf500bbb31f62475efc31"
  *       }
  *
  */
router.post('/', auth.hasRole('admin'), controller.create);

/**
  * @api {put} /api/comparators/:id Substitute a comparator
  * @apiName SubstituteComparator
  * @apiGroup Comparator
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
router.put('/:id', auth.hasRole('admin'), controller.update);

/**
  * @api {patch} /api/comparators/:id Substitute a comparator
  * @apiName SubstituteTransportComparator
  * @apiGroup TransportComparator
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
router.patch('/:id', auth.hasRole('admin'), controller.update);

/**
  * @api {delete} /api/comparators/:id Delete a comparator
  * @apiName DeleteComparator
  * @apiGroup Comparator
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
