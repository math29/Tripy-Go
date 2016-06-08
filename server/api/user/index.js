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
 * @apiParam {String} name   			        Pseudo of the user
 * @apiParam {String} email   			      Email of the user
 * @apiParam {String} role        		    Role of the user
 * @apiParam {String} hashedPassword      Hashed Password
 * @apiParam {String} provider			      Provider
 * @apiParam {String} salt				        Password Salt
 * @apiParam {String} fname               First name of the user
 * @apiParam {String} phone               Phone number of the user
 * @apiParam {Date} birthday              Birthday date
 * @apiParam {String} address             Address - Place
 * @apiParam {Number} zipcode             Zip Code City
 * @apiParam {String} city                City Name
 * @apiParam {String} country             Country
 * @apiParam {String} picture             File id of the avatar's user
 * @apiParam {Collection} facebook		    Facebook linked to the account
 * @apiParam {Collection} twitter		      Twitter linked to the account
 * @apiParam {Collection} google		      Google linked to the account
 * @apiParam {Collection} github		      GitHub linked to the account
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
 * @api {get} /api/users/roles Get roles that this user can assign
 * @apiVersion 0.0.0
 * @apiName GetRoles
 * @apiGroup Users
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    	roles: ['guest','user','admin']
 *  }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/roles', auth.hasRole('admin'), controller.getRoles);


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
  *   ]
  *
  *
  */
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

/**
  * @api {put} /api/users/prefdestination/:id Add a prefered Destination
  * @apiName PutPreferedDestination
  * @apiGroup Users
  *
  * @apiParam {Object} preferedDests List Of String of Prefered Destinations
  * @apiParam {Number} id  User Id you want to add a prefered destination
  *
  * @apiSuccess {User} code
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 Success-Response:
  *   [
  *    ...
  *   ]
  *
  *
  */
router.put('/prefdestination/:id', auth.isAuthenticated(), controller.addPreferedDestination);

/**
  * @api {put} /api/users/:id Substitute a user
  * @apiName SubstituteUser
  * @apiGroup Users
  *
  * @apiUse ApiParamsUser
  *
  * @apiSuccess {User} Modified User
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *          ...
  *      }
  *
  */
router.put('/:id', auth.isAuthenticated(), controller.update);

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
 * @api {put} /api/users/update/automatic/visited/countries/:id Get User's visited countries
 * @apiVersion 0.0.0
 * @apiName GetUsersVisitedCountries
 * @apiGroup Users
 *
 * @apiParam {Number} id  Id of the target user
 *
 * @apiSuccess {User} User
 *
 *
 * @apiUse UserNotAuthorized
 */
router.put('/update/automatic/visited/countries/:id', auth.isAuthenticated(), controller.putAutomaticUpdateVisetedCountries);

/**
 * @api {put} /api/users/update/visited/countries/:id Get User's visited countries
 * @apiVersion 0.0.0
 * @apiName GetUsersVisitedCountries
 * @apiGroup Users
 *
 * @apiParam {Number} id  Id of the target user
 *
 * @apiSuccess {User} User
 *
 *
 * @apiUse UserNotAuthorized
 */
router.put('/update/visited/countries/:id', auth.isAuthenticated(), controller.putUpdateVisetedCountries);

/**
 * @api {get} /api/users/search/:search Search users matching search params
 * @apiVersion 0.0.0
 * @apiName Search users by name
 * @apiGroup Users
 *
 * @apiParam {string} search  name of the user
 *
 * @apiSuccess {User} User
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      status: 200,
 *      data:
 *  [
 *      {
 *            "__v": 0,
 *			  ...
 *            "_id": "564cf500bbb31f62475efc31"
 *       }
 *  ]
 * }
 *
 * @apiUse UserNotAuthorized
 */
router.get('/search/:search', auth.isAuthenticated(), controller.search);

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


/**
  * @api {put} /api/users/:id/:role Update User role
  * @apiName UpdateRole
  * @apiGroup Users
  *
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *         "ok":1
  *     }
  *
  */
router.put('/:id/:role', auth.hasRole('admin'), controller.changeRole);


module.exports = router;
