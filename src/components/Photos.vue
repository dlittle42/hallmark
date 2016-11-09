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
        <button id="choose_btn" class="social" ><span class="btnlabel">Choose File</span><span class="load"><div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div></span></button>
      </form>
      
        

      </div>
 
 
  </template>

  <script>
var $ = require('jquery');
import Vue from 'vue';
//import router from 'vue-router';
var router = require('vue-router');
var Dropzone = require("dropzone");
//var EXIF  = require('exif-js');
//var BinaryFile = require('../js/binaryajax.js');


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
        rotation:'',
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
        //console.log('The current view ' + this.$route.path+' is mounted!!');

        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone("#my-awesome-dropzone", {
          autoProcessQueue: false,
         // thumbnailWidth: 400,
          thumbnailWidth: null,
          thumbnailHeight: null,
          init: function() {

              myDropzone = this;

              $("#my-awesome-dropzone").bind("click",function () {
               // alert('choose');
                $('.btnlabel').hide();
                $('.load').show();

                //$('#load-panel').addClass('active');
                  }
              );
              this.on("canceled", function(file, dataUrl) {
                $('.btnlabel').show();
                $('.load').hide();
              }),
  
              this.on("thumbnail", function(file, dataUrl) {
                  $('.dz-image').last().find('img').attr({width: '100%', height: '100%'});
              }),
           
              this.on("success", function(file) {
                  $('.dz-image').css({"width":"100%", "height":"auto"});
              })
          }
          //thumbnailHeight: 250,
          //createImageThumbnails: false
        });

      


       // //console.dir(myDropzone)

        var scope =this;



       

        myDropzone.on("addedfile", function(file) {
         // alert('addedfile');
          $('#load-panel').addClass('active');
          /* Maybe display some more file information on your page */
         //alert("Added file." + file); 
          //$('body').prepend(file.previewElement)
          //alert($('.dz-image img')[0].src);
       //   console.dir(file);
          //$('#load-panel').addClass('active');
         /*  var width;
            var height;
            var binaryReader = new FileReader();
            binaryReader.onloadend=function(d) {
              var exif, transform = "none";
              exif=EXIF.readFromBinaryFile(new BinaryFile(d.target.result));
              alert(exif.Orientation);
              if (exif.Orientation === 8) {
                  width = img.height;
                  height = img.width;
                  transform = "left";
              } else if (exif.Orientation === 6) {
                  width = img.height;
                  height = img.width;
                  transform = "right";
              }
            };
            binaryReader.readAsBinaryString(file);
           // binaryReader.readAsArrayBuffer(file);
           */
           /* var fr   = new FileReader;
           fr.onloadend = function() {
                var base64 = this.result;
                base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
            var binaryString = atob(base64);
            var len = binaryString.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            var img =  bytes.buffer;

                var exif = EXIF.readFromBinaryFile(img);
                alert(exif.Make);
            };
            
            fr.readAsBinaryString(file);
            */
            var reader = new FileReader();
          reader.onload = function(e) {
            var sum;
            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) sum =-2;
            var length = view.byteLength, offset = 2;
            while (offset < length) {
              var marker = view.getUint16(offset, false);
              offset += 2;
              if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966){
                  sum = -1;
                } 
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                  if (view.getUint16(offset + (i * 12), little) == 0x0112)
                    sum = view.getUint16(offset + (i * 12) + 8, little);
              }
              else if ((marker & 0xFF00) != 0xFF00) break;
              else offset += view.getUint16(offset, false);
            }
           // alert(sum)
            scope.rotation = sum;
            sum =-1;
          };
          reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
           
          //  this.getOrientation(file, function(orientation) {
          //        alert('orientation: ' + orientation);
            //    });
           
        });

        myDropzone.on('thumbnail', function(file, dataUri) {
            // use dataUri here
           // alert(dataUri);
          // alert(file.width+","+file.height);
          /*

          /// test image sizing//////
          
            //console.dir(file)
            var elementID = 'canvas' + $('canvas').length; // Unique ID

            $('<canvas>').attr({
              id: elementID
          }).css({
              width: file.width+'px',
              height: file.height+'px',
             // display: 'none'
          }).appendTo('body');

        var canvas = document.getElementById(elementID);
        var ctx = canvas.getContext('2d');

        var width = file.width;
        var height = file.height;

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        var img = new window.Image();
    img.addEventListener("load", function () {
        canvas.getContext("2d").drawImage(img, 0, 0);
    });
    img.setAttribute("src", dataUri);
    */

        // draw source image into the off-screen canvas:
    //    ctx.drawImage(dataUri, 95, 95, 1010, 1010);
   // alert(scope.rotation)

            $('.btnlabel').show();
            $('.load').hide();
            scope.$emit('imgSelect', dataUri, 'portrait', file.width, file.height, scope.rotation);
        });
    /*
        myDropzone.options = {
          init: function() {
            this.on("addedfile", function(file) { 
              alert("Added file." + file); 
              //console.dir(file);
            });
          }
        };
        */

      })

    },
    componentUpdated (el, binding, vnode, oldVNode) { 
      //console.log('updated!!!!!!!!');
    },

    methods: {
        /**
     * This is the getPhoto library
     */

        
        getSrc: function(img, event){
              //this.$emit('imgSelect', event.target.src)
              //console.dir(event.target)
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
          //console.log('blob='+blob);
          this.postImageToFacebook(this.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
          //FB.api('/me/feed', 'post', {message: 'my first status...', source: blob}, function(response) {

            ////console.log(response);
            //document.getElementById('status').innerHTML = response.id;
          //});
        
        },
 */
// using???
        gotoAlbum: function(){
          //console.log('go album---------')
          //console.log('outside router='+ this.router)
         // this.$router.push('gallery');
          this.router.push({ name: 'gallery', params : { 'imgset': 'backgrounds' }});
         // router.push({ path: 'album', params : { imgset: 'backgrounds' }});
        },
        showHelpPhotos: function(e){
          e.preventDefault();

          if ($('#help-photos').hasClass('active')){

              //$('#help-photos').removeClass('active');
              $('.active').removeClass('active');
            }else{
              $('.active').removeClass('active');
              $('#help-photos').addClass('active');
            }

          $('.m-active').removeClass('m-active');
       


        }
          
        
       
    }
  }

  
  </script>

  <style lang="scss" scoped>



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
   // height: 130px;
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

.dropzone .dz-preview .dz-details, .dropzone-previews .dz-preview .dz-details {
    width: auto !important;
    height: auto !important;
}

.dz-details img {
    width: auto !important;
    height: auto !important;
    position: relative !important;
}

.dropzone:hover{
  background-color: white;
}
.dropzone.dz-clickable {
    cursor: pointer;
}

@media (min-width:600px) {
  .dropzone{
    height: 130px;
  }

  h1.or{
    margin: 5px auto;
  }
}

.load{
  display: none;
}


@media (max-width:599px) {
  .dropzone{
    height: 120px;
  }

  h1.or{
      margin: 0 auto;
      padding: 3px;
    }
  }
</style>
