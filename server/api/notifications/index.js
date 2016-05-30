'use strict';

var express = require('express');
var controller = require('./notifications.controller');
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
router.get('/', auth.isAuthenticated(), controller.show);

router.post('/:id', auth.isAuthenticated(), controller.acknowledge);


module.exports = router;
