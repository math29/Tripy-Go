'use strict';

var express = require('express');
var controller = require('./transportComparator.controller');

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
 * @api {get} /api/transportcomparator Request list of all transport comparators
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
router.get('/', controller.index);

/**
 * @api {get} /api/transportcomparator/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetTransportComparatorById
 * @apiGroup TransportComparator
 *
 * @apiParam {Number} id  Id of the target transport
 *
 * @apiSuccess {Transport} Transport
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
router.get('/:id', controller.show);

/**
  * @api {post} /api/transportComparators Insert a transport comparator
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
router.post('/', controller.create);

/**
  * @api {put} /api/transportComparators/:id Substitute a transport comparator
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
router.put('/:id', controller.update);
router.patch('/:id', controller.update);

/**
  * @api {delete} /api/transportComparatorss/:id Delete a transport comparator
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
router.delete('/:id', controller.destroy);

module.exports = router;
