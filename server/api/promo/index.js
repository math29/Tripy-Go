'use strict';

var express = require('express');
var controller = require('./promo.controller');
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
 * @api {get} /api/promos Request list of all rates
 * @apiVersion 1.0.0
 * @apiName GetPromos
 * @apiGroup Promos
 *
 * @apiSuccess {Array} array of promos
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *    // TODO
 *  ]
 *
 * @apiUse UserNotAuthorized
 */
router.get('/', auth.optionalAuth(),controller.index);

/**
 * @api {post} /api/promo Create a promo
 * @apiVersion 1.0.0
 * @apiName CreatePromo
 * @apiGroup Promos

 *
 * @apiSuccess {Object} promo
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *     'message':'OK'
 *    }
 *
 * @apiUse UserNotAuthorized
 */
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/notify', auth.hasRole('admin'), controller.notifyFb);
router.get('/:id', controller.show);
router.get('/connected/:id', auth.isAuthenticated(), controller.showConnected);


/**
 * @api {delete} /api/promos/:id delete promo with specific ID
 * @apiVersion 1.0.0
 * @apiName DeletePromo
 * @apiGroup Promos
 *
 * @apiSuccess {Object} promos
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 *
 * @apiUse UserNotAuthorized
 */
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
