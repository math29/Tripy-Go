'use strict';

var express = require('express');
var controller = require('./country.controller');
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
 *  @apiDefine ApiParamsCountry
 *
 *
 * @apiParam {String} country_code   Country code abreviation
 * @apiParam {String} country_name   Name of the country
 * @apiParam {String} capital        Capital of the country
 * @apiParam {String} continent      Continent where the country is
 * @apiParam {String} languages      List of language of the continents
 * @apiParam {Number} population     Number of inhabitants
 * @apiParam {Number} area           Country's area in sqare meters
 */

/**
 * @api {get} /api/countries Request list of all countries
 * @apiVersion 0.0.0
 * @apiName GetCountries
 * @apiGroup Countries
 *
 * @apiSuccess {Array} array of countries
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    {
 *      "country_code":"CO",
 *      "country_name":"Country",
 *      "currency_code":"EUR",
 *      "population":654321,
 *      "capital":"Kingstown",
 *      "continent":"North America",
 *      "area":389,
 *      "languages":"en-VC,fr"
 *    }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.isAuthenticated(), controller.index);

/**
  * @api {get} /api/countries/:cat/:name Request list of country where category match name
  * @apiName GetCountriesMatch
  * @apiGroup Countries
  *
  * @apiParam {String} cat  category select which column you want as criteria
  * @apiParam {String} name   name you want for column matches
  *
  * @apiSuccess {Array} array of countries
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 Success-Response:
  *   [
  *      {
  *        "_id": "56311da5daca79981b662afd",
  *        "country_code": "VA",
  *        "country_name": "Vatican City",
  *        "currency_code": "EUR",
  *        "population": 921,
  *        "capital": "Vatican",
  *        "continent": "Europe",
  *        "area": 0.44,
  *        "languages": "la,it,fr",
  *        "__v": 0
  *    },
  *    ...
  *    ]
  *
  *
  */
router.get('/:cat/:name', auth.isAuthenticated(), controller.showByName);

/**
  * @api {post} /api/countries Insert a country
  * @apiName InsertCountry
  * @apiGroup Countries
  *
  * @apiUse ApiParamsCountry
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
router.post('/', auth.hasRole('admin'), controller.create);

/**
  * @api {put} /api/countries Update a country
  * @apiName UpdateCountry
  * @apiGroup Countries
  *
  * @apiUse ApiParamsCountry
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
router.put('/:id', auth.hasRole('admin'), controller.update);

/**
  * @api {delete} /api/countries/:id Delete a country
  * @apiName DeleteCountry
  * @apiGroup Countries
  *
  * @apiParam {Number} id   Id of the Country you want to delete
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
