<!-- src/components/Photos.vue -->

  <template>
    
      <div>
        <h1>CHOOSE A PHOTO<a href="#" class="help" id="help-photos-btn">?</a></h1>
        <!--
        <div class="fb-login-button" scope="public_profile,email" onlogin="this.checkLoginState();">
        </div>
        
        <div class="fb-login-button" scope="public_profile,email" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="false">Login with Facebook</div>

        <fb:login-button size="large"
                   onlogin="Log.info.bind('onlogin callback')">
    Login with Facebook
  </fb:login-button>
    -->
      <!-- was 'postToWall' -->
        <button v-on:click="getGallery" id="facebook" class="social" >Use Facebook Gallery</button>
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
      id="my-awesome-dropzone">
        <button id="choose_btn" class="social" >Choose File</button>
      </form>
      
        

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
    inherit: true,

    router: '',

    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        //msg: 'CHOOSE A PHOTO',
        router: '',
       // accessToken:'',
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
         //$('#social_action').fadeOut();
        if ($('.header').width() > 599){
          $('#social_action').fadeOut();
          $('#mobile_buttons').fadeOut();


        } 
         
           document.getElementById("help-photos-btn").addEventListener('click', this.showHelpPhotos, false);

        router = this.$router;
        console.log('The current view ' + this.$route.path+' is mounted!!');

        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone("#my-awesome-dropzone", {
          autoProcessQueue: false,
          thumbnailWidth: 400,
          //thumbnailHeight: 250,
          //createImageThumbnails: false
        });


       // console.dir(myDropzone)

        var scope =this;

        myDropzone.on("addedfile", function(file) {
          /* Maybe display some more file information on your page */
         // alert("Added file." + file); 
          //$('body').prepend(file.previewElement)
          //alert($('.dz-image img')[0].src);
          //console.dir(file);
        });

        myDropzone.on('thumbnail', function(file, dataUri) {
            // use dataUri here
           // alert(dataUri);
            scope.$emit('imgSelect', dataUri, 'portrait');
        });
    /*
        myDropzone.options = {
          init: function() {
            this.on("addedfile", function(file) { 
              alert("Added file." + file); 
              console.dir(file);
            });
          }
        };
        */

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
              console.dir(event.target)
              //var filename = event.target.src.replace(/^.*[\\\/]/, '')
              this.$emit('imgSelect', event.target.src, 'portrait')
              //this.$router.push('home');
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
        getGallery: function(){
          //this.login(this.statusChangeCallback);
          this.$emit('FBauth', 'gallery')

        },
      /*
        postToFB() { 
          var data = $('#mainStage')[0].toDataURL("image/png");
          var blob = this.dataURItoBlob(data);
          console.log('blob='+blob);
          this.postImageToFacebook(this.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
          //FB.api('/me/feed', 'post', {message: 'my first status...', source: blob}, function(response) {

            //console.log(response);
            //document.getElementById('status').innerHTML = response.id;
          //});
        
        },
 */
// using???
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
  //padding: 0;
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

button#choose_btn {
    border-color: #83c0dc;
    background-color: #2191e1;
    cursor:pointer; 
    width: 85%;
    pointer-events: none;
    padding: 0;
    margin-top: 50px;


     &:hover{
      background-color: #32def4;
    }
}

.dropzone {
    border: 2px dashed #aba890;
    color: #aba890;
    border-radius: 5px;
    max-height: 130px;
    height: 130px;
    padding: 32px;
    margin: 10px auto;
    width: 55%;
    transition: all 0.5s ease;
    background-color: none;
    background:rgba(2,173,231,0) url(../assets/arrow.png) no-repeat center 15%;
   // background-size: 20%;

   .dz-message{
   // margin-top: 50px;
   }
}

.dropzone:hover{
  background-color: white;
}
.dropzone.dz-clickable {
    cursor: pointer;
}
</style>
