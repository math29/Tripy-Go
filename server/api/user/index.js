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
 *	        "_id": "5612bb652e5ef4a40f41acc4",
 *	        "author": "5612bad22e5ef4a40f41acc3",
 *	        "date_departure": null,
 *	        "date_return": null,
 *	        "month_departure": null,
 *	        "choose_by_dates": false,
 *	        "choose_by_month": false,
 *	        "budget": 2000000,
 *	        "nbTravellers": 15,
 *	        "__v": 0,
 *	        "selectedHashtags": [],
 *	        "region_idea": "",
 *	        "personal_interest": {
 *	            "mountain": false,
 *	            "playa": false
 *	        },
 *	        "date_created": "2015-10-05T18:03:17.925Z"
 *	    },...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
