<!-- src/components/Home.vue -->

  <template>
      <!-- message browser only -->
      <div id="message_block">
        <h1>Choose Your Message</h1>
<!--
        <p id="msg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu sapien a tortor gravida imperdiet. Praesent quis justo sed augue sodales suscipit in mattis risus.
        </p>

        <div class="owl-carousel owl-theme">
          <div> Your Content </div>
          <div> Your Content </div>
          <div> Your Content </div>
          <div> Your Content </div>
          <div> Your Content </div>
          <div> Your Content </div>
          <div> Your Content </div>
        </div>
-->
        <div class="carousel">
  <div class="carousel-cell">
    <div class="panel">
    <img src="../assets/message-01-thumb.png">
    </div>
  </div>
  <div class="carousel-cell">
    <div class="panel">
    <img src="../assets/message-02-thumb.png">
    </div>
  </div>
  <div class="carousel-cell">
    <div class="panel">
    <img src="../assets/message-03-thumb.png">
    </div>
  </div>
  <div class="carousel-cell">
    <div class="panel">
    <img src="../assets/message-04-thumb.png">
    </div>
  </div>
  <div class="carousel-cell">
    <div class="panel">
    <img src="../assets/message-05-thumb.png">
    </div>
  </div>
</div>
<!--
          <swiper :options="swiperOption">
            <swiper-slide>
            <p>1. Some text goes right here ...</p>
            </swiper-slide>
            <swiper-slide>
             <p>2. Some text goes right here ...</p>
            </swiper-slide>
             <p>3. Some text goes right here ...</p>
            </swiper-slide>
            <swiper-slide>
             <p>4. Some text goes right here ...</p>
            </swiper-slide>
             <p>5. Some text goes right here ...</p>
            </swiper-slide>
            <swiper-slide>
             <p>6. Some text goes right here ...</p>
            </swiper-slide>
            
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
-->
        

      </div>
 

  </template>

  <script>
var $ = require('jquery');
import Vue from 'vue'
import router from 'vue-router'
//import 'jquery';
//import 'owl.carousel';

import Flickity from 'flickity';
//import 'imports?jQuery=jquery!owl.carousel';


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
      $('#social_action').fadeIn();
      if ($('.header').width() > 600 && $('.header').width() <800){
        $('#mobile_buttons').fadeIn();

      } 


    

        this.initSlider();

      //  this.flkty.on('cellSelect', this.updateSelected);
     // $('.owl-carousel').owlCarousel();
     // document.getElementById("up").addEventListener('click', this.uploadCanvasData, false);
      document.getElementById("dl").addEventListener('click', this.dlCanvas, false);

    //  document.getElementById("mobilesave").addEventListener('click', this.dlCanvasToMobile, false);

      
  
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

        postFB: function(){
          //console.log('postFB');
          this.$emit('fbPost');
        },
        initSlider: function(){

          const carousel = $('.carousel')[0];
        const options = {
            wrapAround: true
        }
          this.flkty = new Flickity(carousel, options);
          var scope = this;

        this.flkty.on( 'select', function(e) {
          console.log( 'Flickity select ' + this.selectedIndex )
          scope.$emit('msgSelect', this.selectedIndex);
         
        })
        },
        
        postImageToFacebook(token, filename, mimeType, imageData, message) {
            var fd = new FormData();
            fd.append("access_token", token);
            fd.append("source", imageData);
            fd.append("message","I just created my perfect Christmas Hearth full of decorations and family photos. Please check it out! http://somesite.here.com");
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
        /*
        dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: 'image/png'});
        },
        */
        /*
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
        */
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

       
        },
         dlCanvasToMobile: function(evt) {


          var dt = document.getElementById("mainStage").toDataURL('image/png');
          window.open(dt, '_blank');
       
        },
        /*
        uploadCanvasData: function()
        {

            var data = $('#mainStage')[0].toDataURL("image/png");
            var blob = this.dataURItoBlob(data);

            var formData = new FormData();
           // formData.append("file", blob);
            formData.append('image', blob, 'filename');

            var request = new XMLHttpRequest();
            request.onload = this.completeRequest;

            request.open("POST", "/upload/add");
            request.send(formData);
        },
        completeRequest: function(evt){
          alert('completed '+ evt)
        },
        
        
        */
        
       
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
   // position: absolute;
  //  bottom: 20px;
  //  left: 10%;
 // transform: translateY(-100%);
  //  display: inline-block;
}

p{
    box-sizing: border-box;
    padding: 4px 20px;
    color: #3c3b3b;
    /* font-weight: 300; */
    font-family: Source Sans Pro, Helvetica, sans-serif;
   // font-size: 14px;
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
