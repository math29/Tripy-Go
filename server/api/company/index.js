'use strict';

var express = require('express');
var controller = require('./company.controller');
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
 *  @apiDefine ApiParamsCompany
 *
 *
 * @apiParam {String} name  Name given by the user to the Company
 * @apiParam {String} img   Img given by the user to th Company
 *
 */

/**
 * @api {get} /api/company/ Request list of all companies
 * @apiVersion 0.0.0
 * @apiName GetCompanies
 * @apiGroup Company
 *
 * @apiSuccess {Array} array of Companies
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
 *            "__v": 0,
 *            "name": "Air France",
 *            "img": "http://air-france.fr/img/logo.png",
 *            "_id": "564cf500bbb31f62475efc31"
 *       }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', controller.index);

/**
 * @api {get} /api/company/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetCompanyById
 * @apiGroup Company
 *
 * @apiParam {Number} id  Id of the target transport type
 *
 * @apiSuccess {Company} Company
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *            "__v": 0,
 *            "name":"Air France",
 *            "img":"http://air-frnace.fr/img/logo.png",
 *            "_id": "564cf500bbb31f62475efc31"
 *       }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', controller.show);

/**
  * @api {post} /api/company/:name/ Insert a transportType
  * @apiName InsertCompany
  * @apiGroup Company
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
  *            "name": "Air france",
  *            "img": "http://air-france.fr/img/logo.png",
  *            "_id": "564cf500bbb31f62475efc31"
  *       }
  *
  */
router.post('/:name', auth.hasRole('admin'),controller.create);

/**
  * @api {put} /api/company/:id Substitute a transportType
  * @apiName SubstituteCompany
  * @apiGroup Company
  *
  * @apiUse ApiParamsCompany
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
  * @api {delete} /api/company/:id Delete a company
  * @apiName DeleteCompany
  * @apiGroup Company
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
