<!-- src/components/Home.vue -->

  <template>

      <div class="transparent">
        <h1>Share</h1>
        <textarea>
          write your message here
        </textarea>
        
    
        <button id="facebook" class="social" >Share on Facebook</button>
        <button id="twitter" class="social" >Share on Twitter</button>
       <!-- <button id="download" class="social" v-on:click="downloadCanvas(null, 'mainStage', 'greeting.png')" >Download</button> -->
       <a id="dl" class="social" download="Hallmark_mantlepiece.png" href="#">Download</a> 
       <!-- <a id="download">Download as image</a> -->
       
      </div>
 

  </template>

  <script>
var $ = require('jquery');
import Vue from 'vue'
import router from 'vue-router'


  export default {
   data() {
      return {
        msg: 'CHOOSE A PHOTO',
        
      }
    },
    route: {
      activate() {
          this.$nextTick(function () {
              // => 'DOM loaded and ready'
              console.log('DOM loaded and ready');
          })
          console.log('DOM activate');
      },

      data: function (transition) {
         
          console.log('The current view is ' + this.$route.params.name);

         // this.setupThreejs();
         return {
               // title,
                //content: store.getList().then(content => content)
            }

         
        }
    },
     mounted: function () {
    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      console.log('home mounted!!!!!!!!');
     // var parent = this;
     /* document.getElementById('download').addEventListener('click', function() {
          parent.downloadCanvas(this, 'mainStage', 'test.png');
      }, false);
      */
      document.getElementById("dl").addEventListener('click', this.dlCanvas, false);
    })
  },
    ready: function () {

      console.log('home ready!')

      
    },
    watch: {
            'content'(data) {
                // Load the external link into new tab
                console.log('watch! content now');

            }
        },

    events: {
      'fade-done': function () {
        console.log('fade-done!!!!!');
       // this.squaresToFadeOut--
       // this.reload();
      }
    },

    methods: {
        
        postImageToFacebook(token, filename, mimeType, imageData, message) {
            var fd = new FormData();
            fd.append("access_token", token);
            fd.append("source", imageData);
            fd.append("message","You could add a pretty long message here with a link back to the site http://somesite.here.com");
           // fd.append("no_story", true);

            // Upload image to facebook without story(post to feed)
            $.ajax({
                url: "https://graph.facebook.com/me/photos?access_token=" + token,
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    console.log("success: ", data);

                    // Get image source url
                    FB.api(
                        "/" + data.id + "?fields=images",
                        function (response) {
                            if (response && !response.error) {
                              console.log("go post to wall!!!!!!");
                                console.log(response.images[0].source);

                                // Create facebook post using image
                                FB.api(
                                    "/me/feed",
                                    "post",
                                    {
                                        "message": "hey there",
                                        "picture": 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',//response.images[0].source,
                                        "link": window.location.href,
                                        "name": 'Look at that, huh?',
                                        "description": message,
                                        "privacy": {
                                            value: 'SELF'
                                        }
                                    },
                                    function (response) {
                                      console.log('feedback: '+response)
                                      console.dir(response);
                                        if (response && !response.error) {
                                            /* handle the result */
                                            console.log("Posted story to facebook");
                                            console.log(response);
                                        }
                                    }
                                );
                            }
                        }
                    );
                },
                error: function (shr, status, data) {
                    console.log("error " + data + " Status " + shr.status);
                },
                complete: function (data) {
                    console.log('Post to facebook Complete');
                }
            });
        },
        dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: 'image/png'});
        },
        imageToCanvas(path, name){
          var can = document.getElementById('canvas');
        var ctx = can.getContext('2d');

          console.log('canvas time: '+ path);
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = function(){
              can.width = img.width;
              can.height = img.height;


              //flip it ///
            //  ctx.translate(img.width-1, img.height-1);
             // ctx.rotate(Math.PI);
              /////////
              ctx.drawImage(img, 0, 0, img.width, img.height);

              ctx.fillStyle = "red";
            ctx.font = "bold 60px Arial";
            ctx.fillText(name, Math.random()*img.width, Math.random()*img.height);

              
             
          }
          img.src = path;

        },

        statusChangeCallback(response) {
          console.log('statusChangeCallback');
          console.log(response);
          // The response object is returned with a status field that lets the
          // app know the current login status of the person.
          // Full docs on the response object can be found in the documentation
          // for FB.getLoginStatus().
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
          } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
          } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into Facebook.';
          }
        },
        downloadCanvas: function(link, canvasId, filename) {
            link.href = document.getElementById(canvasId).toDataURL();
            link.download = filename;
        },
        dlCanvas: function(evt) {


          var dt = document.getElementById("mainStage").toDataURL('image/png');
          //alert(dt);

          /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
          dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

          /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
          dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

          
          evt.target.href = dt;
       
        }
        
        
        
       
    }
  }

  
  </script>

  <style lang="scss" scoped>

h1 {
  //color: #42b983;
}

#swiper{
  //position: absolute;
  //bottom: 100px;
}

.transparent{
  position: relative;
}

.photos{
  //background-color: red;
  //width: 30%;
  //border: 1px solid pink;
  width: 25%;
  order: 3;
}
.swiper-container{
      width: 80%;
    position: absolute;
    bottom: 20px;
    left: 10%;
 // transform: translateY(-100%);
  //  display: inline-block;
}

.dropzone {
    border: 2px dashed #aba890;
    color: #aba890;
    border-radius: 5px;
    max-height: 150px;
    padding: 60px;
    margin: 30px;
    transition: all 0.5s ease;
    background-color: none;
    background:rgba(2,173,231,0) url(../assets/arrow.png) no-repeat center 10px;
}

.dropzone:hover{
  background-color: white;
}
.dropzone.dz-clickable {
    cursor: pointer;
}
</style>
