'use strict';

var express = require('express');
var controller = require('./file.controller');

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
 *  @apiDefine ApiParamsFile
 *
 * @apiParam {File} file   		File you wanna store
 */

 router.get('/', controller.index);

/**
 * @api {get} /api/files/:id Get By Id
 * @apiVersion 0.0.0
 * @apiName GetFileById
 * @apiGroup Files
 *
 * @apiParam {Number} id  Id of the target file
 *
 * @apiSuccess {File} file 	File desired
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  [
 *      {
 *	        "_id": "5612bb652e5ef4a40f41acc4",
 *	        ...
 *	    }
 *  ]
 *
 */
router.get('/:id', controller.show);

/**
  * @api {post} /api/files Post file
  * @apiName InsertFile
  * @apiGroup Files
  *
  * @apiUse ApiParamsFile
  *
  * @apiSuccess {Object} Object response
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 201 Created:
  *      {
  *            "__v": 0,
  *            "_id": "5612bb652e5ef4a40f41acc4",
  *	           ...
  *       }
  *
  */
router.post('/', controller.create);

module.exports = router;
