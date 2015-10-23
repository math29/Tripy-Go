'use strict';

var express = require('express');
var controller = require('./country.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:cat/:name', controller.showByName);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
