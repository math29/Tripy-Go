'use strict';

var express = require('express');
var controller = require('./transportComparator.controller');
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
 *  @apiDefine ApiParamsTransport
 *
 *
 * @apiParam {ObjectId} company 			 			Company id of the comparator
 * @apiParam {[ObjectId]} types             Types transport of comparator
 *
 */

/**
 * @api {get} /api/transport/comparators Request list of all transport comparators
 * @apiVersion 0.0.0
 * @apiName GetTransportComparators
 * @apiGroup TransportComparator
 *
 * @apiSuccess {Array} array of Transport comparators
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
 * @api {get} /api/transport/comparators/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetTransportComparatorById
 * @apiGroup TransportComparator
 *
 * @apiParam {Number} id  Id of the target comparator transport
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
 *            types: [
 *              {
 *               _id:'564ceecea3300dfc3906f536',
 *               name: 'Plane',
 *               image: '564ceecea3300dfc3906f536'
 *              },
 *              ...
 *            ]
 *            "_id": "564cf500bbb31f62475efc31"
 *       }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', controller.show); //auth.isAuthenticated(),

/**
 * @api {get} /api/transport/comparators/comments/:id/:limit/:offset Get Comments By Id with offset
 * @apiVersion 0.0.0
 * @apiName GetTransportComparatorCommentsById
 * @apiGroup TransportComparator
 *
 * @apiParam {Number} id  Id of the target comparator transport
 * @apiParam {Number} offset  Offset of the comment wanted
 * @apiParam {Number} limit  Number of comments wanted from the offset
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
 *            types: [
 *              {
 *               _id:'564ceecea3300dfc3906f536',
 *               name: 'Plane',
 *               image: '564ceecea3300dfc3906f536'
 *              },
 *              ...
 *            ]
 *            "_id": "564cf500bbb31f62475efc31"
 *       }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/comments/:id/:limit/:offset', auth.isAuthenticated(), controller.getComments);

/**
  * @api {post} /api/transport/comparators Insert a transport comparator
  * @apiName InsertTransportComparator
  * @apiGroup TransportComparator
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
  * @api {put} /api/transport/comparators/:id Substitute a transport comparator
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
router.put('/:id', auth.hasRole('admin'), controller.update);

/**
  * @api {patch} /api/transport/comparators/:id Substitute a transport comparator
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
  * @api {delete} /api/transport/comparators/:id Delete a transport comparator
  * @apiName DeleteTransportComparator
  * @apiGroup TransportComparator
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
