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
var Twit = require('twit');

//var https = require('https');

/*

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'sUXiHWb9dnJaCILp39ISFcRae',
    consumerSecret: 'yxFc0BIt25xxVeQHIwbZGI9X1vj8EQYIvVC2bTZ8J6KEMUzaFK',
    callback: 'http://yoururl.tld/something'
});
*/


var T = new Twit({
  consumer_key:         'sUXiHWb9dnJaCILp39ISFcRae',
  consumer_secret:      'yxFc0BIt25xxVeQHIwbZGI9X1vj8EQYIvVC2bTZ8J6KEMUzaFK',
  access_token:         '7269812-Yrn5e2otmkt8Ap9fKAwL2evXwSAOXHI0V3RPcgZ0Ko',
  access_token_secret:  'rkwxcjze97nW63yFgzpI89hswS9emDJNg7zj8y71w7BAm',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


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




router.post(
  '/twitter_status',
  images.multer.single('image'),
  function postStatus (req, res, next) {

    var data = req.body;

    console.log('tokens '+req.body.token1);
    console.log('tokens '+req.body.token2);
/*

    twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            //store accessToken and accessTokenSecret somewhere (associated to the user) 
            //Step 4: Verify Credentials belongs here 
        }
    });
*/
    console.dir(req.file)

    console.log('FILE!!! ==='+req.file)


    //T.config.consumer_secret = req.body.token1;
   // T.config.access_token_secret = req.body.token1;

   // console.log(T);



    //
    //  tweet 'hello world!'
    //
    /*
    T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
      console.log(data)
    })
    */
/*
    //Generate the canvas
var canvas = new Canvas(800, 800);
var context = canvas.getContext('2d');



//Generate a random colour
var r = Math.floor((Math.random() * 256));
var g = Math.floor((Math.random() * 256));
var b = Math.floor((Math.random() * 256));
var color = "rgb("+r+","+g+","+b+")";

    // draw box
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 800);
    context.lineTo(800, 800);
    context.lineTo(800, 0);
    context.closePath();
    context.lineWidth = 5;
    context.fillStyle = color;
    context.fill();

var fs = require('fs')
  ,  out = fs.createWriteStream(__dirname + '/text.png')   
  , stream = canvas.pngStream();
var dataUrl = canvas.pngStream().pipe(out);
*/
    //
    // post a tweet with media
    //
 //   var b64content = req.image;//fs.readFileSync('/path/to/img', { encoding: 'base64' })
//var b64content = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAgAElEQVR4Xqy9W6y0W3aeNWud/3/vPrsP7o4Tn42I4gQThUSAggRCIHEBXEQgxY7TdiexE9kiIo5yAEtcIKKAOFwQIRSihAtbCEWRkIBIGAkEFw52YsdO7LTt9qndh927ex//9a9zofd9xjvnrG9V1Vprx+V09t6rqr76vjHnHId3vGOM1fd897+/Pj191m6ur9rt7U3za7XyPw4ODtvJ6Wm7u7trtzfX/ud6veYz9To8OmrHx6f++/ru1tfQ51pbN713dHTiT95e6/u3976v3zo6Om6HR8dtVb+ba+vz15cXG793fHK68Vn9ru5Wv6tn4P5WfgT/22rl5zg61vUPeM6b63q+g3ZweOT75L3LdnNz01b+Zr3q+7o/XUefubu99fP1jxwcttOzZ+3y4ty/L3nmfuabXx0etpOTM//ppstDsprkeXjU9Ix66Xd0nXXJ/eDwsB2fnNS9Xvs5luuh73lNTk67PCUDf269bi9fvpB0+g8enZy042PWaH7d3t4iT/+29kJdo/bF0fFJOzw8bNfXV/6cXquDA//t8FCyOmg3N9fTmoyr6zmOjo7awcFRu7u98TXm59BvnZ690q4t65t2fHLm96+vNveCfuP45JnXWuumz67Xm/LUmiGLg3Z3d+N7ijz1N73ndb2JPDe/b3keHrWjY33u4J6cLl6+u3Hvkv3JybN7n9NvX19d1tnYfFty0znR79zeDplp3fQ3yVOf8TVqTeYr6P61j3WO2HeXm/titWqnp88tn5ubK//W6uCwXV299J4YWz3yYO2y95a/pbXXb+p8ohc417pfrZXe4zm0P+/L02sieR4e9u/l+5eX5+1WZ7D2rPbI2bPn9/a5dcP1lZ9p+WIfHlt2+pz2p3SSdYH33nE78H64Y49ZX03780B64dB6RvK5ury49/snp5zjq6vLd...4mhSO/8SCqc/Owfv4Gwm4YVwwTWyeHMHXfEWT27MFPvvm/0W4ZMtXI9RLDDxYnH4VyVfbnzSYLelo81pvVOmZGRlGvVDFfqWCh0YErdwmhSQVqWJVM8pSiYHYij5DbkemRmvRmx4ZpWcgP5bCyuiQMZaNtYHx0FBr17YqG1bVVKBKZS6K3jYyehtFoYnJqErVmXd5PTSOAvvh3JjaJUtpTUKvUYLHYGy2EFNrLkigVQpxSKjFOSQoczr0+g1rq7Q7K5AZkB0Sql9Q0lEtFIdoRuudOeGJiE0LdsOyPydm48N4FYXxzwFO0KCaHR+ASwapzv0ZSmivnyOPjcBZPpYSpTuZ4Oqbgjpt3wGzUBGovlstwImFo2bRwSNLJBMZGRuQYtFhc3OmqDQMLC8tIZ7NSyNrVOgaHMyIddWwXhmWjVKuiXLEwlEticnJCphNVi8E0DaQScRjtpryOhTVKU31oRFGoaGByFZ3qOFFHaO7qoWvbGBzKB4SiriPNFIsEmzkWXTbnRJAyA1k0Gg3ZeVMdwJ38yTOX0DJZTMkSpDTMF+UGWeMy7YqVbiCPpO3tyIgu+35dT6FjmgiFPZHeEobnFE/VDgmntL99/bVTsCVhJPCGI5ud9yaLzTViExUKhNwJtfed4iRWXXbtvGhBilpgUCNe873wnQBa5mtBtz6I8YyE50iTRFtqUYHLIyESU5CIadg2X5Mplg/++77ydYz+2lExkxF+ED0JCM+yiKiqvCf/w3/+7/jSv/6XopcWcl9vkg104tckVe83Td9o0hXuB62xew3ohymi1xd1/puvheW6OHvLfpithhS/vlNaf5LtM8Q5kffh6SAINvg48vwz0LbsDDzaP2CP/mEg9/eb0DeuI65vVvi+KC5eluaVxZzckMjgEC7SWObESZnQyQnonw9/xzW1fI+32WtS+ln2vLaNzTPY/8TjkjbHJpirpoC8yNyAoDn7v3CclLFaXsJxAAAAAElFTkSuQmCC';
    // first we must post the media to Twitter
  //  T.post('media/upload', { media_data: canvas.toBuffer().toString('base64') }, function (err, data, response) {

   // var b64content = fs.readFileSync(req.file, { encoding: 'base64' })
    var bufferBase64 = new Buffer( req.file.buffer, 'binary' ).toString('base64');

    T.post('media/upload', { media_data: bufferBase64 }, function (err, data, response) {
      console.log('!!!!!!!!!!!!!!!!!!!! go post !!!!!!!!!!!!!!!!!!!!!!!!')
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
     // res.json({"uploaded": mediaIdStr});
/*
      if (!err) {
          res.json({"uploaded": mediaIdStr});
      }else{
          console.log('err');
            return res.end("Error uploading file.");
        }
*/
      var altText = "Small flowers in a planter on a sunny balcony, blossoming."
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
           console.log('posted');
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { status: 'I just created my Most Wonderful Mantlepiece of Christmas! You can create one, too! http://www.hallmarkmoviesandmysteries.com/ via @HallmarkMovie', media_ids: [mediaIdStr] }

          T.post('statuses/update', params, function (err, data, response) {
            console.log(data)
            res.end("File is uploaded");
          })
      
        }else{
          console.log('err');
            return res.end("Error uploading file.");
        }

      
      })
    })

    //if(err) {
      //  return res.end("Error uploading file.");
    //}
    
    /*
    var data = req.body;

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
   */
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