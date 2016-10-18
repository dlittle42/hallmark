<!-- src/components/Photos.vue -->

  <template>
    
      <div class="transparent">
        <h1>CHOOSE A PHOTO</h1>
        <!--
        <div class="fb-login-button" scope="public_profile,email" onlogin="this.checkLoginState();">
        </div>
        
        <div class="fb-login-button" scope="public_profile,email" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="false">Login with Facebook</div>

        <fb:login-button size="large"
                   onlogin="Log.info.bind('onlogin callback')">
    Login with Facebook
  </fb:login-button>
    -->

        <button v-on:click="postToWall" id="facebook" class="social" >Login with Facebook</button>
      <!--  <a v-on:click="postToFB" >Post Photo </a><br> -->

    
        <h1 class="or">OR</h1>
        <div id="status">
        </div>
  <!--
        <div class="owl-carousel">
            <div class="item"><img src="../assets/portrait_thumb01.png"></div>
            <div class="item"><img src="../assets/portrait_thumb02.png"></div>
            <div class="item"><img src="../assets/portrait_thumb01.png"></div>
            <div class="item"><img src="../assets/portrait_thumb02.png"></div>
        </div>
  -->

  <form action="/file-upload"
      class="dropzone"
      id="my-awesome-dropzone"></form>


        <swiper-slide><img src="../assets/hallmark_gallery.png"></swiper-slide>
          <swiper :options="swiperOption">
            <swiper-slide>
            <img v-on:click="getSrc(null, $event)" src="../assets/portrait_thumb01.png">
            </swiper-slide>
            <swiper-slide>
            <img v-on:click="getSrc(null, $event)"src="../assets/portrait_thumb02.png">
            </swiper-slide>
            <img v-on:click="getSrc(null, $event)" src="../assets/portrait_thumb01.png">
            </swiper-slide>
            <swiper-slide>
            <img v-on:click="getSrc(null, $event)"src="../assets/portrait_thumb02.png">
            </swiper-slide>
            <img v-on:click="getSrc(null, $event)" src="../assets/portrait_thumb01.png">
            </swiper-slide>
            <swiper-slide>
            <img v-on:click="getSrc(null, $event)"src="../assets/portrait_thumb02.png">
            </swiper-slide>
            
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        

      </div>
 
 
  </template>

  <script>
var $ = require('jquery');
import Vue from 'vue';
//import router from 'vue-router';
var router = require('vue-router');
var Dropzone = require("dropzone");

// ...
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'

  export default {

    router: '',

    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        msg: 'CHOOSE A PHOTO',
        router: '',
        accessToken:'',
        allPhotos: [],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 2,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10
        }
      }
    },
    
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
        router = this.$router;
        console.log('The current view ' + this.$route.path+' is mounted!!');

      })
    },
    componentUpdated (el, binding, vnode, oldVNode) { 
      console.log('updated!!!!!!!!');
    },

    methods: {
        /**
     * This is the getPhoto library
     */
        getSrc: function(img, event){
              //this.$emit('imgSelect', event.target.src)
              this.$emit('imgSelect', event.target.src, 'portrait')
              //this.$router.push('home');
        },
        makeFacebookPhotoURL( id, accessToken ) {
          var path = 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
          console.log(path);
          $('#images').append('<img src="'+path+'" height="64px" width="64px">');
          return path;
        },
        login( callback ) {
          FB.login(function(response) {
            if (response.authResponse) {
              //console.log('Welcome!  Fetching your information.... ');
              if (callback) {
                callback(response);
              }
            } else {
              console.log('User cancelled login or did not fully authorize.');
            }
          }, {
              scope: 'user_photos,publish_actions', 
              return_scopes: true
          });
        },
        getAlbums( callback ) {
          FB.api(
              '/me/albums',
              {fields: 'id,cover_photo,name'},
              function(albumResponse) {
                console.log( ' got albums ' );
                if (callback) {
                  callback(albumResponse);
                }
              }
            );

        },
        getPhotosForAlbumId( albumId, albumName, callback ) {
          FB.api(
              '/'+albumId+'/photos',
              {fields: 'id'},
              function(albumPhotosResponse) {
                console.log( ' got photos for album ' + albumId );
                //console.dir(albumPhotosResponse);
                if (callback) {
                  callback( albumId, albumName, albumPhotosResponse );
                }
              }
            );
        },
        getLikesForPhotoId( photoId, callback ) {
          FB.api(
              '/'+albumId+'/photos/'+photoId+'/likes',
              {},
              function(photoLikesResponse) {
                if (callback) {
                  callback( photoId, photoLikesResponse );
                }
              }
            );
        },
        getPhotos(scope, callback) {

          //var allPhotos = [];

          //var accessToken = '';

          scope.login(function(loginResponse) {
              scope.accessToken = loginResponse.authResponse.accessToken || '';
              scope.getAlbums(function(albumResponse) {
                  console.dir(albumResponse);
                  var i, album, deferreds = {}, listOfDeferreds = [];

                  for (i = 0; i < albumResponse.data.length; i++) {
                    album = albumResponse.data[i];
                    console.log(album.name);
                    deferreds[album.id] = $.Deferred();
                    listOfDeferreds.push( deferreds[album.id] );
                    scope.getPhotosForAlbumId( album.id, album.name, function( albumId, albumName, albumPhotosResponse ) {
                        var i, facebookPhoto;
                        console.dir(albumPhotosResponse );
                        for (i = 0; i < albumPhotosResponse.data.length; i++) {
                          facebookPhoto = albumPhotosResponse.data[i];

                          scope.allPhotos.push({
                            'id'  : facebookPhoto.id,
                            'added' : facebookPhoto.count,
                            'name'  : albumName,
                            'url' : scope.makeFacebookPhotoURL( facebookPhoto.id, scope.accessToken )
                          });
                        }
                        deferreds[albumId].resolve();
                      });

                  }


                  $.when.apply($, listOfDeferreds ).then( function() {
                    if (callback) {

                      callback( scope.allPhotos );
                    }
                  }, function( error ) {
                    if (callback) {
                      callback( scope.allPhotos, error );
                    }
                  });
                });
            });
        },
        postToFB() { 
          var data = $('#mainStage')[0].toDataURL("image/png");
          var blob = this.dataURItoBlob(data);
          console.log('blob='+blob);
          this.postImageToFacebook(this.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
          /*FB.api('/me/feed', 'post', {message: 'my first status...', source: blob}, function(response) {

            console.log(response);
            //document.getElementById('status').innerHTML = response.id;
          });
          */
        },
        postToWall(){
          console.log('outside router='+ this.router)
          //passed scope through getPhotos callback???
          this.getPhotos( this, function( photos ) {
            console.log("**********READY**********")
            console.dir(photos);
            console.log('url======'+photos[0].url);
            router.push({ name: 'gallery', params : { 'fbset': photos }});
         // router.push({ path: 'album', params : { imgset: 'backgrounds' }});
           // router.push('album');
            
            //console.log('****'+photos[0].url)
           // self.imageToCanvas(photos[0].url, photos[0].name);
            
          });
        },
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
        gotoAlbum: function(){
          console.log('go album---------')
          console.log('outside router='+ this.router)
         // this.$router.push('gallery');
          this.router.push({ name: 'gallery', params : { 'imgset': 'backgrounds' }});
         // router.push({ path: 'album', params : { imgset: 'backgrounds' }});
        }
        
        
       
    }
  }

  
  </script>

  <style lang="scss" scoped>

h1.or {
  //color: #42b983;
  margin: 5px auto;
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
    margin: 10px 30px;
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
