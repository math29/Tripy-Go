'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
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
 *  @apiDefine ApiParamsUser
 *
 *
 * @apiParam {String} name   			Pseudo of the user
 * @apiParam {String} email   			Email of the user
 * @apiParam {String} role        		Role of the user
 * @apiParam {String} hashedPassword    Hashed Password
 * @apiParam {String} provider			Provider
 * @apiParam {String} salt				Password Salt
 * @apiParam {Collection} facebook		Facebook linked to the account
 * @apiParam {Collection} twitter		Twitter linked to the account
 * @apiParam {Collection} google		Google linked to the account
 * @apiParam {Collection} github		GitHub linked to the account
 */

/**
 * @api {get} /api/users Get all users
 * @apiVersion 0.0.0
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Array} array of users
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    	{
 *	    },...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.hasRole('admin'), controller.index);

/**
  * @api {delete} /api/users/:id Delete a user
  * @apiName DeleteUser
  * @apiGroup Users
  *
  * @apiParam {Number} id   Id of the User you want to delete
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

/**
 * @api {get} /api/users/me Get current user connected
 * @apiVersion 0.0.0
 * @apiName GetCurrentUser
 * @apiGroup Users
 *
 * @apiSuccess {User} current user
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    	{
 *	    },...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/me', auth.isAuthenticated(), controller.me);

/**
  * @api {put} /api/users/:id/password Change Password
  * @apiName PutChangePassWord
  * @apiGroup Users
  *
  * @apiParam {Number} id  User Id you want to change password
  *
  * @apiSuccess {User} Modified User
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 Success-Response:
  *   [
  *    ...
  *    ]
  *
  *
  */
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

/**
  * @api {put} /api/users/:id Substitute a user
  * @apiName SubstituteUser
  * @apiGroup Users
  *
  * @apiUse ApiParamsUser
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

/**
 * @api {get} /api/users/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetUsersById
 * @apiGroup Users
 *
 * @apiParam {Number} id  Id of the target user
 *
 * @apiSuccess {User} User
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
 *            "__v": 0,
 *			  ...
 *            "_id": "564cf500bbb31f62475efc31"
 *       }
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', auth.isAuthenticated(), controller.show);

/**
  * @api {post} /api/users Insert a User
  * @apiName InsertUser
  * @apiGroup Users
  *
  * @apiUse ApiParamsUser
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
router.post('/', controller.create);

module.exports = router;
