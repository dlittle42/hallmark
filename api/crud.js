// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var express = require('express');
var config = require('../g-config');
var bodyParser = require('body-parser');
var images = require('../lib/images');


var router = express.Router();

// Set Content-Type for all responses for these routes
/*
router.use(function (req, res, next) {
  res.set('Content-Type', 'text/html');
  next();
});
*/
router.use(bodyParser.json());

/**
 * POST /books/add
 *
 * Create a book.
 */
// [START add]

router.post(
  '/add',
  images.multer.single('image'),
  images.sendUploadToGCS,
  function insert (req, res, next) {
    var data = req.body;

    console.log('FILE!!! ==='+req.file)
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      console.log(req.file.cloudStoragePublicUrl)
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
   // res.redirect(data.imageUrl);
    res.status(200).json(data.imageUrl);  
   // return data.imageUrl;
  }
);


/**
 * Errors on "/books/*" routes.
 */
router.use(function handleRpcError (err, req, res, next) {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
