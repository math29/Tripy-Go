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
 *  @apiDefine ApiParams
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
 * @apiVersion 1.0.0
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
router.get('/',  controller.stats);

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
//router.get('/:cat/:name', controller.stats);

/**
  * @api {post} /api/countries Insert a country in database
  * @apiName InsertCountry
  * @apiGroup Countries
  *
  * @apiUse ApiParams
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
//router.post('/',  controller.stats);

/**
  * @api {put} /api/countries Update a country in database
  * @apiName UpdateCountry
  * @apiGroup Countries
  *
  * @apiUse ApiParams
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
//router.put('/:id',  controller.stats);

module.exports = router;
