'use strict';

var express = require('express');
var controller = require('./country.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:cat/:name', auth.isAuthenticated(), controller.showByName);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'),controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
