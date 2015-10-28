'use strict';

var express = require('express');
var controller = require('./country.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

/**
 * @api {get} /api/countries Request list of all countries
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
 *      ...
 *    }, ...
 *  ]
 *
 * @apiError User not authenticated
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 403 Forbidden
 *  Unauthorized
 */
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:cat/:name', auth.isAuthenticated(), controller.showByName);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'),controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
