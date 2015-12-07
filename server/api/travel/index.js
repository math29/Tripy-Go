'use strict';

var express = require('express');
var controller = require('./travel.controller');
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
 *  @apiDefine ApiParamsTravel
 *
 *
 * @apiParam {String} name   						Name of the travel
 * @apiParam {String} info   						Complementary informations
 * @apiParam {Boolean} active        				Activation
 * @apiParam {Date} date_created      				Date of creation
 * @apiParam {User} author      					Owner of the travel
 * @apiParam {Number} budget     					Budget
 * @apiParam {Number} nbTravellers					Number of travellers
 * @apiParam {Date} date_departure					Number of travellers
 * @apiParam {Date} date_return						Number of travellers
 * @apiParam {Date} month_departure					Number of travellers
 * @apiParam {Boolean} choose_by_dates				Number of travellers
 * @apiParam {Boolean} choose_by_month				Number of travellers
 * @apiParam {Collection} personal_interest			Number of travellers
 * @apiParam {String} region_idea					Number of travellers
 * @apiParam {Array} selectedHashtags				Number of travellers
 * @apiParam {Location} departure            Departure Location
 * @apiParam {Location} arrival             Arrival Location
 */

/**
 * @api {get} /api/travels Get all travels
 * @apiVersion 0.0.0
 * @apiName GetTravels
 * @apiGroup Travels
 *
 * @apiSuccess {Array} array of travels
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
router.get('/', controller.index);

/**
 * @api {get} /api/travels/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetTravelsById
 * @apiGroup Travels
 *
 * @apiParam {Number} id  Id of the target travel
 *
 * @apiSuccess {Travel} Travel
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
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
 *	    }
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/:id', controller.show);

/**
  * @api {post} /api/travels Post travel
  * @apiName InsertTravel
  * @apiGroup Travels
  *
  * @apiUse ApiParamsTravel
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *            "__v": 0,
  *            "_id": "5612bb652e5ef4a40f41acc4",
  *	           "author": "5612bad22e5ef4a40f41acc3",
  *	           "date_departure": null,
  *	           "date_return": null,
  *	           "month_departure": null,
  *	           "choose_by_dates": false,
  *	           "choose_by_month": false,
  *	           "budget": 2000000,
  *	           "nbTravellers": 15,
  *	           "__v": 0,
  *	           "selectedHashtags": [],
  *	           "region_idea": "",
  *	           "personal_interest": {
  *	               "mountain": false,
  *	               "playa": false
  *	           },
  *	           "date_created": "2015-10-05T18:03:17.925Z"
  *            "_id": "564cf500bbb31f62475efc31"
  *       }
  *
  */
router.post('/', auth.isAuthenticated(), controller.create);

/**
  * @api {put} /api/travels/:id Substitute a travel
  * @apiName SubstituteTravel
  * @apiGroup Travels
  *
  * @apiUse ApiParamsTravel
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
  * @api {put} /api/travels/:id Update a travel
  * @apiName UpdateTravel
  * @apiGroup Travels
  *
  * @apiUse ApiParamsTravel
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
  * @api {delete} /api/travels/:id Delete a travel
  * @apiName DeleteTravel
  * @apiGroup Travels
  *
  * @apiParam {Number} id   Id of the Travel you want to delete
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 204 No Content:
  *      {
  *     }
  *
  */
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;