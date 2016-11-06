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
//var Twit = require('twit');

//var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var session = require('cookie-session')
//var session = require('express-session');
var inspect = require('util-inspect');
var oauth = require('oauth');


//var https = require('https');



var _twitterConsumerKey = "sUXiHWb9dnJaCILp39ISFcRae";
var _twitterConsumerSecret = "yxFc0BIt25xxVeQHIwbZGI9X1vj8EQYIvVC2bTZ8J6KEMUzaFK";

//var callbackDomain = "http://127.0.0.1:8080";
//var callbackDomain = "http://hallmark-dev.herokuapp.com";
var callbackDomain = "http://hallmark-greeting.appspot.com";
//var callbackDomain = "http://127.0.0.1:8080";


var consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", callbackDomain+"/upload/sessions/callback", "HMAC-SHA1");



var router = express.Router();

// Set Content-Type for all responses for these routes
/*
router.use(function (req, res, next) {
  res.set('Content-Type', 'text/html');
  next();
});
*/
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
//router.use(logger({ path: "log/express.log"}));
router.use(cookieParser());
router.use(session({ secret: "very secret", resave: false, saveUninitialized: true}));



/**
 * POST /upload/add
 *
 * Post to google cloud for facebook
 */
// [START add]

router.post(
  '/add',
  images.multer.single('image'),
  images.sendUploadToGCS,
  function insert (req, res, next) {
    var data = req.body;

    console.dir(req.body)

    console.log('FILE!!! ==='+req.file)
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      console.log(req.file.cloudStoragePublicUrl)
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
   // res.redirect(data.imageUrl);
   // res.status(200).json(data.imageUrl);  
    res.json({"uploaded": data.imageUrl});
   // return data.imageUrl;
  }
);

router.get('/test', function(req, res){
    res.send('You are here'); 
});


/// twitter endpoints
router.get('/sessions/connect', function(req, res){

  // if (!req.session.oauthRequestToken){

      consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
        if (error) {
          res.send("Error getting OAuth request token : " + inspect(error), 500);
        } else {  

          req.session.oauthRequestToken = oauthToken;
          req.session.oauthRequestTokenSecret = oauthTokenSecret;
          console.log("Double check on 2nd step");
          console.log("------------------------");
          console.log("<<"+req.session.oauthRequestToken);
          console.log("<<"+req.session.oauthRequestTokenSecret);
          res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
        }
      });

 // }else{
    //  res.send('<script>window.close();</script>');
 // }
});



router.get('/sessions/callback', function(req, res){
  console.log("------------------------");
  console.log(">>"+req.session.oauthRequestToken);
  console.log(">>"+req.session.oauthRequestTokenSecret);
  console.log(">>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + inspect(error) + "[" + oauthAccessToken + "]" + "[" + oauthAccessTokenSecret + "]" + "[" + inspect(results) + "]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      res.send('<script>window.close();</script>');
    }
  });
});

router.post(
  '/twitter_status',
  images.multer.single('image'),
  function postStatus (req, res, next) {


         var bufferBase64 = new Buffer( req.file.buffer, 'binary' ).toString('base64');
     
        consumer.post(
          "https://upload.twitter.com/1.1/media/upload.json",
          req.session.oauthAccessToken, //test user token
          req.session.oauthAccessTokenSecret, //test user secret 
          { media_data: bufferBase64 },
          function(err, data, response){
              console.log('!!!!!!!!!!!!!!!!!!!! go post !!!!!!!!!!!!!!!!!!!!!!!!')
             // var mediaIdStr = data.media_id_string;
              console.log(data);
              var jdata = JSON.parse(data)
              console.log('media string is '+ jdata.media_id_string);
              var params = { 
                status: 'I just created a Most Wonderful Mantlepiece of Christmas! You can create one, too! http://bit.ly/HallmarkMantlepiece via @HallmarkMovie', 
                media_ids: [jdata.media_id_string] 
              }

              consumer.post(
                "https://api.twitter.com/1.1/statuses/update.json",
                req.session.oauthAccessToken, 
                req.session.oauthAccessTokenSecret,
                params, 
                function (err, data, response) {
                  //console.log(data)
                  res.end("File is uploaded");
                })
              

            }
          
        
        )
  }
)
 






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