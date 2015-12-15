'use strict';

var express = require('express');
var controller = require('./language.controller');
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
 * @apiParam {String} code   Language code abreviation
 * @apiParam {String} name   Name of the languge
 * @apiParam {String} note   Note about language
 */

/**
 * @api {get} /api/language Request list of all known languages
 * @apiVersion 1.0.0
 * @apiName GetLanguages
 * @apiGroup Languages
 *
 * @apiSuccess {Array} array of languages
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    {
 *      "code":"fr",
 *      "name":"Français",
 *      "note":"note bidon"
 *    }, ...
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.hasRole('admin'), controller.index);

/**
  * @api {get} /api/language/:cat/:name Request list of language where category match name
  * @apiName GetLanguageMatch
  * @apiGroup Languages
  *
  * @apiParam {String} cat  category select which column you want as criteria
  * @apiParam {String} name   name you want for column matches
  *
  * @apiSuccess {Array} array of languages
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 Success-Response:
  *   [
  *      {
  *        "_id": "56311da5daca79981b662afd",
  *        "code": "en",
  *        "name": "English",
  *        "note": "Most talked language"
  *    },
  *    ...
  *    ]
  *
  *
  */
router.get('/:cat/:name', auth.hasRole('admin'), controller.showByName);

/**
  * @api {post} /api/language Insert a language in database
  * @apiName InsertLanguage
  * @apiGroup Languages
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
router.post('/', auth.hasRole('admin'), controller.create);

/**
  * @api {put} /api/language Update a language in database
  * @apiName UpdateLanguage
  * @apiGroup Languages
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
router.put('/:id', auth.hasRole('admin'), controller.update);

/**
  * @api {delete} /api/languages/:id Delete a language
  * @apiName DeleteLanguage
  * @apiGroup Languages
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
