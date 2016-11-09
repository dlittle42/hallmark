<template>
  <div id="app" class="wrapper">
  <!--
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
-->
    <header class="header">
      <div id="layout_title" class="aside aside-1">
      <a href="http://www.hallmarkmoviesandmysteries.com/" target="_blank">
        <img class="logo" src="./assets/hallmark_main_logo.png">
        </a>

      </div>
      <div id="main_title" class="main">

        <img class="logo" src="./assets/title_build_your_own.png">

      </div>
      <div id="photos_title" class="aside aside-2">
      <a href="http://www.hallmarkmoviesandmysteries.com/the-most-wonderful-movies-of-christmas" target="_blank">
        <img class="logo" src="./assets/title_christmas.png">
        </a>
      </div>
    </header>
    <!--
    <section class="content">
      <div class="columns">
      -->
          <div id="layout_block" class="content-block aside aside-1">
            
            <div class="transparent">
              
              <h1>CHOOSE A LAYOUT<a href="#" class="help" id="help-layout-btn">?</a></h1> 
           
              <div id="scene-scroll" class="scroll">
              
                <figure>
                <img class="highlight" v-on:click="swapScene(1)" src="./assets/layout01.png">
                </figure>
                <figure>
                <img class="highlight" v-on:click="swapScene(2)" src="./assets/layout02.png">
                </figure>
                <figure>
                <img class="highlight" v-on:click="swapScene(3)" src="./assets/layout03.png">
                </figure>
                <!--
                <figure>
                <img class="highlight" v-on:click="swapScene(4)" src="./assets/template1_thumb.png">
                </figure>
                <figure>
                <img class="highlight" v-on:click="swapScene(5)" src="./assets/template2_thumb.png">
                </figure>
                <figure>
                <img class="highlight" v-on:click="swapScene(6)" src="./assets/template1_thumb.png">
                </figure>
                -->
               
              </div>
          
   
         
            </div>
            
          </div>
          <!-- main stage -->
          <div id="main_block" class="main content-block">
            
            
            <div class="transparent">
              <div id="load-panel">
                <div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
              </div>
              <div id="help-layout" class="help-panel">
                <a href="#" class="help close" id="help-layout-close">X</a>
                 <h1>Choose a Layout</h1>
                <p>Are you a traditionalist or is a modern mantlepiece more to your liking?</p> 
                <p>Simply click on the layout that best matches your Christmas style!</p>

                <p>Use the scrollbar to move the list up and down and click on the layout you like best. Then click on the squares in the center panel to add your customizations. Don’t forget to share your Most Wonderful Mantlepiece of Christmas with your friends afterwards!</p>
              </div>
              <div id="help-photos" class="help-panel">
                <a href="#" class="help close" id="help-photos-close">x</a>
                <h1>Choose a Photo</h1>
                <p>No mantlepiece would be complete without a framed photo!</p>

                <p>There are two ways to add a photo to your Mantlepiece:</p>
                <ol>
                  <li>Login with Facebook and choose from your Facebook photos</li>
                  <li>Choose from the photos on your device, either by dragging and dropping or by clicking the Choose files button</li>
                </ol>

                  <p>Whichever method you choose, you can then drag the photo around in the frame until it looks perfect.</p> 

                  <p>Be sure to share your Most Wonderful Mantlepiece of Christmas with your friends afterwards!</p>
              </div>
              <div id="thanks">
              <a href="#" class="help close" id="thanks-close">X</a>
              <h1>Thanks for creating and sharing your Most Wonderful Mantlepiece of Christmas!</h1>
                   <p>Remember, to keep the holiday spirit filling your home all season, watch the Most Wonderful Movies of Christmas, only on Hallmark Movies & Mysteries.</p></br>
                   <div id="playlist"></div>
                   
              </div>
              <p id="caption">Change this picture</p>
              <canvas id="mainStage"></canvas>
         

            </div>
          </div>

          <div id="photo_block" class="content-block aside aside-2">

            <div class="transparent">


              <transition name="fade" mode="out-in">
                <router-view v-on:imgSelect="updateImage" v-on:FBauth="getFBstatus" v-on:msgSelect="updateMessage"></router-view>
              </transition>
              <!--
              <div id="intro">
                <img class="logo" src="./assets/title_christmas.png">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus erat non mollis gravida. Nullam laoreet neque eget turpis convallis, a posuere sapien tempor. Donec semper malesuada finibus. Vivamus eleifend.</p>
              </div>
              -->
         
            </div>

            <div id="mobile_buttons">
                <button id="message_btn" class="social" v-on:click="showMessages">Choose a message</button>
                <button id="layout_btn" class="social" v-on:click="showLayouts">Select a layout</button>
              </div>

              <div id="social_action">
                <h1>Share Your Greeting</h1>
                <button id="facebook" class="social" v-on:click="getFBstatus"><span class="longbtn">Share on Facebook</span><span class="shortbtn">Share</span></button>
                          
                <button id="twitter" class="social"><span class="longbtn">Share on Twitter</span><span class="shortbtn">Share</span></button>
               <!--
                <button id="twitter" class="social" v-on:click="resizeOutput(null,'twitter')">Share on Twitter</button>
             -->
              <!--  <a id="dl" class="social" download="Hallmark_mantlepiece.png" href="#">Download</a>  -->
                <a id="dl" class="social" href="#">Download</a> 
                <!--
                <a id="mobileSave" class="social" href="#">Download Mobile</a> 
                <a id="safariSave" class="social" download="Hallmark_mantlepiece.png" href="#">Download Safari</a> 
                -->
              <!--  <a id="mobilesave" class="social"  href="#">Mobile Save</a> -->
             <!--  <a id="up" class="social" href="#">Upload</a> -->
               </div>
        
          </div>

          <!--
      </div>
    </section>
    -->
    <footer class="footer">
      <img src="./assets/mantlepiece_logo_footer.png">
    </footer>
  
</div>
</template>

<script>
//var {$, jQuery} = require('jquery');
window.jQuery = window.$ = require("jquery");
import router from 'vue-router';
var PIXI = require('pixi.js');
var FastClick = require('fastclick');
import 'flickity/dist/flickity.min.css';
import { TweenMax, TimelineMax, Power0 } from 'gsap';
var colorProps = require('gsap/src/uncompressed/plugins/ColorPropsPlugin')

var FileSaver =require('file-saver');
var UAParser = require('ua-parser-js');
require('./js/jquery.oauthpopup');


//import SpriteUtilities  from './js/spriteUtilities';
//var gesture = require('pixi-simple-gesture')
//var poly = require('jquery.pointer-events-polyfill');

import setting from './setting';

var mainStage, wallpaper, stage, renderer, headline, frame, portrait, tree, fireplace, gift, marker_container, mantle01,mantle02, mantle03, mantle04,stocking01, stocking02, stocking03, stocking04, mantlepiece, yulelog;

 var buttons = [];

export default {

  


  data () {
    
  
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      accessToken:'',
      allPhotos: [],
      layout: "",
      selectedMsg: "",
      browser:"",
      os:"",
      base_image:"",
      wide_frame:"",
      square_frame:"",
      authorized:""


    }
   
  },

  mounted: function () {
    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      //console.log('mounted!!!!!!!!');
      //attachFastClick(document.body);
      /*
      FastClick.attach(document.body);
      */
      if( top === self ) { // not in a frame
          window.location.href='http://www.hallmarkmoviesandmysteries.com/the-most-wonderful-movies-of-christmas/mantlepiece'
     }


      this.setupPixi();
     // $('#mainStage').height($('#main_block').width() / 1);
     document.getElementById("help-layout-btn").addEventListener('click', this.showHelpLayouts, false);
  
     document.getElementById("dl").addEventListener('click', this.downloadClick, false);
     //document.getElementById("mobileSave").addEventListener('click', this.dlMobile, false);
   //  document.getElementById("safariSave").addEventListener('click', this.dlSafari, false);

     document.getElementById("help-layout-close").addEventListener('click', this.closeHelp, false);
     document.getElementById("help-photos-close").addEventListener('click', this.closeHelp, false);
     document.getElementById("thanks-close").addEventListener('click', this.closeHelp, false);

     
     this.checkToBlob();
      
      var parser = new UAParser();

      var result = parser.getResult();
    // this will also produce the same result (without instantiation):
    // var result = UAParser(uastring);
   // alert(result.browser.name)
    this.browser = result.browser.name;
    this.os = result.os.name;
    //alert(this.os);

    this.square_frame = new Image();
    this.square_frame.src = './static/images/photoframe.png';

    this.wide_frame = new Image();
    this.wide_frame.src = './static/images/frameborder.png';
   // alert(this.browser)

// for ie pointer-events
     // window.pointerEventsPolyfill();
     var scope = this;

     $('#twitter').click(function(){

        scope.gaEvent('Twitter Share');

        if (scope.authorized!=true){
            $.oauthpopup({
                path: '/upload/sessions/connect',
                windowOptions: scope.centerPopUp(),
                callback: function(){
                 // $.get('/user_info', function(data){
                   // $('#user_info').html(JSON.stringify(data));
                   // console.log('we got callback');
                    scope.authorized = true;
                    scope.resizeOutput(null,'twitter');
                  //});
                }
              });
          }else{
            scope.resizeOutput(null,'twitter');
          }
      });


      
      
    })
  },
  componentUpdated (el, binding, vnode, oldVNode) { 
    //console.log('updated!!!!!!!!');
  },

  methods: {
      getAlert() {
        alert('function call');
      },
       centerPopUp: function(){
          var w=800;
          var h=600;
          var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
          var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

          var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
          var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

          var left = ((width / 2) - (w / 2)) + dualScreenLeft;
          var top = ((height / 2) - (h / 2)) + dualScreenTop;

          var newWindow = 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;

          return newWindow;
      },
      checkToBlob: function(){
        if (!HTMLCanvasElement.prototype.toBlob) {
         Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function (callback, type, quality) {

            var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (var i=0; i<len; i++ ) {
             arr[i] = binStr.charCodeAt(i);
            }

            callback( new Blob( [arr], {type: type || 'image/png'} ) );
          }
         });
        }
      },

      updateMessage: function(idx){
        this.selectedMsg = idx+1;
      },
      updateImage: function(img, target, w, h, rot){
        $('#load-panel').addClass('active');
        $('.m-active').removeClass('m-active');
       // alert('update image '+img);
       // this.imageToCanvas(img);
       //alert(img + " and "+target)
       var fullimg;
     //  if (img.includes('graph.facebook') || img.includes('http')){
      //if(img.length >30){
     // if (img.includes('access_token')){

      if (img.indexOf('access_token') >= 0){
        //image from facebook
          fullimg = img + '&.png';
        //  fullimg = 'http://scontent.xx.fbcdn.net/v/t1.0-9/1930037_17350251593_3889_n.jpg?oh=4db67fbc44c24de4f00318e07f758b6c&oe=58CCB2B2'
      // }else if (img.includes('.png') || img.includes('data:image')){
       }else if (img.indexOf('.png') >= 0 || img.indexOf('data:image') >= 0){
        //files from the carousel or dropzone
          fullimg = img
       }else{
          //prepopulated images from gallery
          fullimg = "./static/images/"+img+ ".png";
       }
      // console.log("FULLIMAGE="+fullimg)

       //fullimg = "https://scontent.xx.fbcdn.net/v/t1.0-9/301406_10150280973301594_716561513_n.jpg?oh=31f090bc7c4acefaa14603eeff3156b5&oe=588E9495"

     //  fullimg="https://graph.facebook.com/10153785297671594/picture?access_token=EAAKAylEi…eOGet9RgnZAJubjuwUPqo7fWUZBpvwCON03xLMjpPLdZA2kx364TmzJ5uWA4eLB86GSBXgZDZD"
        //create image to preload:

        this.imageToCanvas(fullimg, target, w, h, rot);
      },
      getSrc: function(img){
            this.layout = img.srcElement.src;
            this.imageToCanvas(this.layout, 'wallpaper');
            $('#load-panel').addClass('active');
      },
      
      imageToCanvas: function(path, target, w, h, rot){

         //console.warn(target);
          this.$router.push({ name: 'home'});

          console.log('target='+target)
         // //console.log('---' + path)
        //  //console.log('---' + path.toString())
          //$('body').prepend($('<img>',{id:'theImg',src:path}))

          //facebook redirects a url to the image
          //fake out the PIXI loader with a faux file extension
        //  var texture01 = PIXI.Texture.from(path+'&.png')

        //  eval(target).setTexture(texture01);
     //  console.log(path);
     //  console.log(texture01)
         

         var dimension, image;

         //reset img position
         var scope = this;


          image = new Image();
          image.src = path;
          image.onload = function() {

              var obj = eval(target);
          /*
              EXIF.getData(image, function() {
                var make = EXIF.getTag(this, "Orientation");
                var model = EXIF.getTag(this, "Model");
                alert(make + '   &&&   '+model)
                
            });

           */

              obj.dimension = {
                  width: image.naturalWidth,
                  height: image.naturalHeight
              };
              //console.log(dimension); // Actual image dimension
            //  //console.log(this.src)

              
            

              var texture01 = PIXI.Texture.from(path)
              obj.setTexture(texture01);
              if (target == 'portrait'){
                //alert(portrait);
                portrait.position.x = 250;
                portrait.position.y = 150;




                //console.warn('portrait.width='+portrait.width+',height='+portrait.height)
                //console.warn('img.width='+w+',height='+h);
                 //console.warn('dimension.width='+obj.dimension.width+',height='+obj.dimension.height);
                
               
                obj.ratio = Math.max(frame.width/obj.dimension.width,frame.height/obj.dimension.height);
                obj.alt_ratio = Math.max(frame.width/obj.dimension.height,frame.height/obj.dimension.width);
                //console.log('my ratio is '+obj.ratio);
          

                if (rot ==6 ){
                  //alert(rot +' -turn right: rotate 70');
                 
                   setTimeout(function(){ 
                      portrait.rotation = Math.PI/2;
                      portrait.scale.x = portrait.scale.y = portrait.alt_ratio;
                    }, 1000); 
                  
                  //alert(portrait.rotation);
                
                }else{
                  portrait.rotation = 0;
                  obj.scale.x = obj.scale.y = obj.ratio;
              
                }

               // obj.scale.x = obj.scale.y = obj.ratio;

              }




              //$('#load-panel').delay(1000).removeClass('active');
              $('#load-panel').delay(500).queue(function(next){
                 // console.log('reveal img');
                  scope.showMarkers();
                  $(this).removeClass("active");
                  next();
              });
          };
      /*
          PIXI.loader.reset();
          PIXI.loader.add('newImg', path+'?&.png').load(function (loader, resources) {
        // This creates a texture from a 'bunny.png' image.
       // bunny = new PIXI.Sprite(resources.bunny.texture);

        // frame = PIXI.Sprite.fromImage('./static/images/frame01.png');
           //   var texture = PIXI.TextureCache["images/anyImage.png"];  
            // frame = new PIXI.Sprite(resources.bunny.texture);
            var obj = eval(target);
             obj.setTexture(resources.newImg.texture);
            alert('width='+ resources.newImg.texture.width+ " , height="+ resources.newImg.texture.height);
            if (target == 'portrait'){
              var ratio = Math.min(frame.width/resources.newImg.texture.width,
                   frame.height/resources.newImg.texture.height);
             // alert(ratio);
              obj.scale.x = obj.scale.y = ratio;
            }

           
            
          });
           */


/*
          bkgd = PIXI.Sprite.fromImage(path);

          // center the sprite's anchor point
          //bkgd.anchor.set(0.5);

          // move the sprite to the center of the screen
          bkgd.position.x = 0;
          bkgd.position.y = 0;

          stage.addChild(bkgd);
    */
      },
      setupPixi: function(){
 /*
        var stage = new PIXI.Stage(0xff00ff),
        canvas = document.getElementById('mainStage'),
        scale = window.devicePixelRatio,
        width = canvas.width,
        height = canvas.height,
        renderer = PIXI.autoDetectRenderer(width * scale, height * scale, canvas);

        var stage = new PIXI.Container(),
        renderer = PIXI.autoDetectRenderer(100%, 100%);
        //document.body.appendChild();
        $('.main #scene').append(renderer.view);
        */

       // document.body.appendChild(renderer.view);
        //var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
        //document.body.appendChild(renderer.view);
        var parent = this;

        // create the root of the scene graph
        var canvas = document.getElementById('mainStage'),
        scale = window.devicePixelRatio,
        width = 500,//$('#mainStage').width(),
        height = 500;//$('#mainStage').height();
        //console.log('w='+width+',h='+height);


       renderer = PIXI.autoDetectRenderer(width , height, { 
        view:canvas, 
       // transparent: true,
        preserveDrawingBuffer:true 
       });
       //console.dir(renderer);

       $('#mainStage').width($('#main_block').width() / 1);
         $('#mainStage').height($('#mainStage').width() / 1);
       $(window).resize(function(){
        $('#mainStage').width($('#main_block').width() / 1);
         $('#mainStage').height($('#mainStage').width() / 1);
      });

/*
       PIXI.loader.add([    
           "./static/images/frame01.png",
           "./static/images/frame02.png" 
        ])  
        .reset()
         .on("progress", this.loadProgressHandler)  
         .load(this.setup);
*/
        PIXI.loader.reset();
        PIXI.loader.add('bunny', './static/images/frame-01a.png').load(function (loader, resources) {
    // This creates a texture from a 'bunny.png' image.
   // bunny = new PIXI.Sprite(resources.bunny.texture);

    // frame = PIXI.Sprite.fromImage('./static/images/frame01.png');
       //   var texture = PIXI.TextureCache["images/anyImage.png"];  
         frame = new PIXI.Sprite(resources.bunny.texture);

         frame.scale.x = frame.scale.y = .85;
          frame.position.x = width/2;
          frame.position.y = height/2 - 100;
          frame.val='frame';
          frame.anchor.set(0.5);


          var container = new PIXI.Container();
          container.position.x =0;// width / 2;
          container.position.y =0;//height / 2;
         // container.anchor.set(0.5);

          //console.log(frame.width)

          portrait = PIXI.Sprite.fromImage('./static/images/portrait01.png');
          //portrait.image.crossOrigin = "anonymous";
          portrait.scale.x = portrait.scale.y = .85;
          portrait.position.x = width/2;
          portrait.position.y = height/2 - 100;
          portrait.val='portrait';
          portrait.anchor.set(0.5);
          portrait.interactive = true;
          portrait.buttonMode = true;
          portrait.dragging = false;

         // stage.on('mousedown', this.onDragStart)
        

          parent.setPortraitEvents();
    

        stage.addChild(portrait);

      //  stage.addChild(container);
      //  container.addChild(portrait);
        stage.addChild(frame);

        var mask_rect = new PIXI.Graphics();
        mask_rect.beginFill(0xFF700B, 1);
        var buffer = 10;
        var adjustedX = frame.position.x - frame.width/2 + buffer;
        var adjustedY = frame.position.y - frame.height/2 +buffer;
        mask_rect.drawRect(adjustedX, adjustedY, frame.width - buffer*2, frame.height - buffer*2);
    //    mask_rect.anchor.set(0.5);

        stage.addChild(mask_rect);

        portrait.mask = mask_rect;

    

/*
           var marker1 = PIXI.Sprite.fromImage('./static/images/marker.png');
        marker1.position.x = width/2;
        marker1.position.y = height/2;
        marker1.anchor.set(0.5);
        marker1.interactive = true;
        marker1.on('mousedown', this.onDown);
        marker1.on('touchstart', this.onDown);

        stage.addChild(marker1);
        */
         // 
          parent.setupMantle();
          parent.setupMarkers();


          headline = PIXI.Sprite.fromImage('./static/images/clear.png');

        headline.scale.x = headline.scale.y = .5;
        headline.position.x = width/2;
        headline.position.y = 50;
        headline.val='headline';
        headline.anchor.set(0.5);
      
        stage.addChild(headline);
        

      });



   

     //  document.getElementById('mainStage').appendChild(renderer.view);
       mainStage = $('#mainStage canvas');

        // create the root of the scene graph
       stage = new PIXI.Container();
       //stage = new PIXI.DisplayObjectContainer();
       stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
     // stage.position.x = width/2;
      //  stage.position.y = height/2;
      //  stage.anchor.set(0.5);


       stage.interactive = true;
     //  stage.button = true;

       //stage.on('mousedown', this.onDragStart)

     // stage

            // set the mouseover callback...
    //  var touch_enabled = window.DocumentTouch && document instanceof DocumentTouch;
   
      if ($('.header').width() < 600){
        stage.on('tap', this.onStageFlash)
      
      }else{
        stage.on('mouseover', this.onStageOver)
        stage.on('pointerover', this.onStageOver)
        stage.on('mouseout', this.onStageOut)
        stage.on('pointerout', this.onStageOut)



      }
      


        // create a new Sprite from an image path.
       wallpaper = PIXI.Sprite.fromImage('./static/images/wallpaper-01.png');

        // center the sprite's anchor point
        //wallpaper.anchor.set(0.5);

        // move the sprite to the center of the screen
        wallpaper.width = width;
        wallpaper.height = width;
        wallpaper.position.x = width/2;
        wallpaper.position.y = height/2;
        wallpaper.val='wallpaper';
        wallpaper.anchor.set(0.5);


        stage.addChild(wallpaper);


        fireplace = PIXI.Sprite.fromImage('./static/images/fireplace-01.png');

        fireplace.scale.x = fireplace.scale.y = .6;
        fireplace.position.x = width/2;
        fireplace.position.y = height - (height/4);
        fireplace.val = 'fireplace';
        fireplace.anchor.set(0.5);
        stage.addChild(fireplace);
//console.log(this.os);
//if (this.os != "Android"){

  var isAndroid = /(android)/i.test(navigator.userAgent);
      if (!isAndroid){
         var texture = PIXI.Texture.fromVideo('./static/images/Fire/fire.mp4');
         var source = texture.baseTexture.source;
         source.loop = true;
         //console.dir(source);
       //  source.pause();source.play();

        // create a new Sprite using the video texture (yes it's that easy)
        var videoSprite = new PIXI.Sprite(texture);

        
        videoSprite.width = 418*.6;//renderer.width;
        videoSprite.height = 290*.6;//renderer.height;
       // videoSprite.scale.x = videoSprite.scale.y = .6;
        videoSprite.anchor.set(.5, 1);
        videoSprite.position.x = 250;
        videoSprite.position.y = 500;

        videoSprite.loop = true;

        stage.addChild(videoSprite);
}else{
 // console.log('android');
}

        gift = PIXI.Sprite.fromImage('./static/images/gift-01.png');

        gift.scale.x = gift.scale.y = .6;
        gift.position.x = width;
        gift.position.y = height;
        gift.val = 'gift';
        gift.anchor.set(1);
        stage.addChild(gift);


        tree = PIXI.Sprite.fromImage('./static/images/tree-01.png');

        tree.scale.x = tree.scale.y = .75;
        tree.position.x = 0;
        tree.position.y = 0;
        tree.val = 'tree';
        //tree.anchor.set(0.5);
        stage.addChild(tree);

      // this.setupFireplace();
       

       // this.setObjEvents(frame);
       // this.setObjEvents(portrait);
       // this.setObjEvents(wallpaper);
      //  this.setObjEvents(fireplace);
      //  this.setObjEvents(gift);
      //  this.setObjEvents(tree);


        //parent.setupMarkers();

        requestAnimationFrame(this.animate);


       // this.resize();

        //handle resizing
       //renderer.resize($('#main_block').width(), $('#main_block').height());
/*
        //Use Pixi's built-in `loader` object to load an image
        PIXI.loader
          .add("./static/images/room01.png")
          .load(setup);

        //This `setup` function will run when the image has loaded
        function setup() {

          //Create the `cat` sprite from the texture
          var cat = new PIXI.Sprite(
            PIXI.loader.resources["./static/images/room01.png"].texture
          );

          //Add the cat to the stage
          stage.addChild(cat);

          //Render the stage   
          renderer.render(stage);
        }
        */
      },
      /*
      loadProgressHandler:function(loader, resource) {  
         //Display the file `url` currently being loaded  
         //console.log("loading: " + resource.url);  
         //Display the precentage of files currently loaded  
         //console.log("progress: " + loader.progress + "%");   
         //If you gave your files names with the `add` method, you can access  
         //them like this  
         ////console.log("loading: " + resource.name);
      },
      setup: function() {  
        //console.log("All files loaded");
      },
    */
      animate() {
          requestAnimationFrame(this.animate);

          // just for fun, let's rotate mr rabbit a little
         // bkgd.rotation += 0.1;


          // render the stage
          renderer.render(stage);
      },
      setPortraitEvents: function(){
        //console.log('set P events')
/*
        //console.dir(gesture);

        gesture.default.pinchable(portrait, true)

        portrait.on('pinchstart', function() {
          //console.log('pinch start')
        })

        portrait.on('pinchmove', function(event) {
          //console.log('pinch move', event)
          portrait.scale.x = event.scale;
          portrait.scale.y = event.scale;
        })

        portrait.on('pinchend', function() {
          //console.log('pinch end')
        })

*/

  var isAndroid = /(android)/i.test(navigator.userAgent);

        if (this.os == "iOS" || isAndroid==true){
         // alert('mobile');
     
          portrait.on('touchstart', this.onDragStart)
          portrait.on('touchend', this.onDragEnd)
          portrait.on('touchendoutside', this.onDragEnd)
          portrait.on('touchmove', this.onDragMove);
  
          portrait.on('tap', this.rotateImg)
    

        }else{
       //   alert('not mobile');
          portrait.on('pointerdown', this.onDragStart)
          portrait.on('touchstart', this.onDragStart)

          portrait.on('pointerup', this.onDragEnd)
          portrait.on('pointerupoutside', this.onDragEnd)
          portrait.on('touchend', this.onDragEnd)
          portrait.on('touchendoutside', this.onDragEnd)
          portrait.on('pointermove', this.onDragMove)
          portrait.on('touchmove', this.onDragMove);
          portrait.on('click', this.rotateImg)
          portrait.on('tap', this.rotateImg)
          portrait.on('pointertap', this.rotateImg)

          portrait.on('mousedown', this.onDragStart)
        portrait.on('mouseup', this.onDragEnd)
        portrait.on('mouseupoutside', this.onDragEnd)
        portrait.on('mousemove', this.onDragMove)
     
        }


        
       // portrait.on('tap', this.rotateImg)
/*
        //      portrait
        // events for drag start
        portrait.on('mousedown', this.onDragStart)
     //   portrait.on('pointerdown', this.onDragStart)
        portrait.on('touchstart', this.onDragStart)
        // events for drag end
        portrait.on('mouseup', this.onDragEnd)
        portrait.on('mouseupoutside', this.onDragEnd)
     //   portrait.on('pointerup', this.onDragEnd)
     //   portrait.on('pointerupoutside', this.onDragEnd)
        portrait.on('touchend', this.onDragEnd)
        portrait.on('touchendoutside', this.onDragEnd)
        // events for drag move
        portrait.on('mousemove', this.onDragMove)
    //    portrait.on('pointermove', this.onDragMove)
        portrait.on('touchmove', this.onDragMove);

        portrait.on('click', this.rotateImg)
        portrait.on('tap', this.rotateImg)



    //    portrait.on('pointertap', this.rotateImg)
  
*/

      },
      rotateImg: function(e){

        if (portrait.counter <10){
         // console.log('rotate' + e.target);
          e.target.rotation+=1.5708; //radians
          if(e.target.scale.x == e.target.ratio){
            e.target.scale.x = e.target.scale.y = e.target.alt_ratio;
          }else{
            e.target.scale.x = e.target.scale.y = e.target.ratio;
          }
        }
      },
      setObjEvents: function(obj){
        //console.log('setObjEvents on '+obj)

        obj.interactive = true;
        obj.button = true;

          obj.on('mousedown', this.onMarkerDown)
              .on('touchstart', this.onMarkerDown)
              .on('pointerdown', this.onMarkerDown)

                // set the mouseup and touchend callback...
                .on('mouseup', this.onMarkerUp)
                .on('pointerup', this.onMarkerUp)
                .on('touchend', this.onMarkerUp)
                .on('mouseupoutside', this.onMarkerUp)
                .on('pointerupoutside', this.onMarkerUp)
                .on('touchendoutside', this.onMarkerUp)

                // set the mouseover callback...
                .on('mouseover', this.onMarkerOver)
                .on('pointerover', this.onMarkerOver)

                // set the mouseout callback...
                .on('mouseout', this.onMarkerOut)
                .on('pointerout', this.onMarkerOut)


                // you can also listen to click and tap events :
              .on('click', this.getGallery)
              .on('tap', this.getGallery)
              .on('pointertap', this.getGallery)




      },
      setupFireplace: function(){

     //   var u = new SpriteUtilities();

        PIXI.loader
            .add('../static/images/Fire/yulelog.json')
            .load(this.onAssetsLoaded);

   //     var frameTextures = u.frameSeries(0, 69, "Fire_", ".jpg");
     //   var anySprite = u.sprite(frameTextures);

      },
      onAssetsLoaded: function(){
        //console.log('.......assets loaded......');

        // create an array to store the textures
        var explosionTextures = [];
        
        for (var i=0; i < 26; i++) 
        {
          var texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i+1) + ".png");
          explosionTextures.push(texture);
        };
        
        // create a texture from an image path
        // add a bunch of aliens
        for (var i = 0; i < 50; i++) 
        {
          // create an explosion MovieClip
          var explosion = new PIXI.MovieClip(explosionTextures);
          
        
          explosion.position.x = Math.random() * 800;
          explosion.position.y = Math.random() * 600;
          explosion.anchor.x = 0.5;
          explosion.anchor.y = 0.5;
          
          explosion.rotation = Math.random() * Math.PI;
          explosion.scale.x = explosion.scale.y = 0.75 + Math.random() * 0.5
          
          explosion.gotoAndPlay(Math.random() * 27);
          
          stage.addChild(explosion);
        }
    

    /*
    

  
        // create an array of textures from an image path
        var frames = [];

        for (var i = 0; i < 49; i++) {
            var val = i < 10 ? '0' + i : i;

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame('Fire_000' + val + '.jpg'));
        }

        yulelog = new PIXI.extras.MovieClip(frames);

        yulelog.position.set(300);

        yulelog.anchor.set(0.5);
        yulelog.animationSpeed = 0.5;

        yulelog.play();

        stage.addChild(yulelog);
        */
      },

      setupMantle: function(){

        var width = 500,
        height = 500;

        var inc=10;

        mantlepiece = PIXI.Sprite.fromImage('./static/images/clear.png');

        mantlepiece.scale.x = mantlepiece.scale.y = .5;
        mantlepiece.position.x = 250;
        mantlepiece.position.y = 300;//(height/inc)*5;
        mantlepiece.val = 'mantlepiece';
        mantlepiece.anchor.set(.5, .5);
        stage.addChild(mantlepiece);


        stocking01 = PIXI.Sprite.fromImage('./static/images/clear.png');

        stocking01.scale.x = stocking01.scale.y = .2;
        stocking01.position.x = (width/inc)*2;
        stocking01.position.y = (height/inc)*7;
        stocking01.val = 'stocking01';
        stocking01.anchor.set(.5);
        stage.addChild(stocking01);

      
        stocking02 = PIXI.Sprite.fromImage('./static/images/clear.png');

        stocking02.scale.x = stocking02.scale.y = .2;
        stocking02.position.x = (width/inc)*4;
        stocking02.position.y = (height/inc)*7;
        stocking02.val = 'stocking02';
        stocking02.anchor.set(.5);
        stage.addChild(stocking02);

       
        stocking03 = PIXI.Sprite.fromImage('./static/images/clear.png');

        stocking03.scale.x = stocking03.scale.y = .2;
        stocking03.position.x = (width/inc)*6;
        stocking03.position.y = (height/inc)*7;
        stocking03.val = 'stocking03';
        stocking03.anchor.set(.5);
        stage.addChild(stocking03);

    
        stocking04 = PIXI.Sprite.fromImage('./static/images/clear.png');

        stocking04.scale.x = stocking04.scale.y = .2;
        stocking04.position.x = (width/inc)*8;
        stocking04.position.y = (height/inc)*7;
        stocking04.val = 'stocking04';
        stocking04.anchor.set(.5);
        stage.addChild(stocking04);


        mantle01 = PIXI.Sprite.fromImage('./static/images/clear.png');

        mantle01.scale.x = mantle01.scale.y = .12;
        mantle01.position.x = (width/inc)*2;
        mantle01.position.y = 275;//(height/inc)*5;
        mantle01.val = 'mantle01';
        mantle01.anchor.set(.5, 1);
        stage.addChild(mantle01);

      
        mantle02 = PIXI.Sprite.fromImage('./static/images/clear.png');

        mantle02.scale.x = mantle02.scale.y = .12;
        mantle02.position.x = (width/inc)*4;
        mantle02.position.y = 275;//(height/inc)*5;
        mantle02.val = 'mantle02';
        mantle02.anchor.set(.5, 1);
        stage.addChild(mantle02);

       
        mantle03 = PIXI.Sprite.fromImage('./static/images/clear.png');

        mantle03.scale.x = mantle03.scale.y = .12;
        mantle03.position.x = (width/inc)*6;
        mantle03.position.y = 275;//(height/inc)*5;
        mantle03.val = 'mantle03';
        mantle03.anchor.set(.5, 1);
        stage.addChild(mantle03);

    
        mantle04 = PIXI.Sprite.fromImage('./static/images/clear.png');

        mantle04.scale.x = mantle04.scale.y = .12;
        mantle04.position.x = (width/inc)*8;
        mantle04.position.y = 275;//(height/inc)*5;
        mantle04.val = 'mantle04';
        mantle04.anchor.set(.5, 1);
        stage.addChild(mantle04);


       

        

      },
      setupMarkers: function() {

        var width = 500,//$('#mainStage').width(),
        height = 500;//$('#mainStage').height();

        marker_container = new PIXI.DisplayObjectContainer();
        marker_container.width = width;
        marker_container.height = height;

          marker_container.position.x =0;// width / 2;
          marker_container.position.y =0;//height / 2;

        stage.addChild(marker_container);

       
/*
        var buttonPositions = [
            175, 75,
            655, 75,
            410, 325,
            150, 465,
            685, 445
        ];
*/
        var inc = 10;

        var buttonPositions = [
            ['wallpaper', (width/inc)*9, height/inc],
          //  ['tree', width/inc, (height/inc) * 3],
            ['frame', (width/inc)*2, (height/inc)*3],
            ['portrait', width/2, (height/2) - 100],
            ['mantle01', (width/inc)*2, 250], //250
            ['mantle02', (width/inc)*4, 250],
            ['mantle03', (width/inc)*6, 250],
            ['mantle04', (width/inc)*8, 250],
            ['mantlepiece', (width/inc)*9, 290], //(height/inc)*5
            ['stocking01', (width/inc)*2, (height/inc)*7],
            ['stocking02', (width/inc)*4, (height/inc)*7],
            ['stocking03', (width/inc)*6, (height/inc)*7],
            ['stocking04', (width/inc)*8, (height/inc)*7],
            ['fireplace', width/2, (height/inc) * 8]//,
           // ['gift', (width/inc)*9, (height/inc) * 8]


        ]

       // var noop = function () {
       //   //console.log('click');
       // };

        var textureButton = PIXI.Texture.fromImage('./static/images/marker.png');

        for (var i = 0; i < buttonPositions.length; i++)
        {
            var button = new PIXI.Sprite(textureButton);
            button.buttonMode = true;

            button.anchor.set(0.5);

            button.position.x = buttonPositions[i][1];
            button.position.y = buttonPositions[i][2];
            button.val = buttonPositions[i][0];

            // make the button interactive...
            button.interactive = true;
/*
          var graphics = new PIXI.Graphics();
          graphics.interactive = true;
          graphics.mousedown =  this.onMarkerUp.bind(undefined, "test");
*/
          
/*
            button
                // set the mousedown and touchstart callback...
                .on('mousedown', this.onMarkerDown)
                .on('touchstart', this.onMarkerDown)

                // set the mouseup and touchend callback...
                .on('mouseup', this.onMarkerUp)
                .on('touchend', this.onMarkerUp)
                .on('mouseupoutside', this.onMarkerUp)
                .on('touchendoutside', this.onMarkerUp)

                // set the mouseover callback...
                .on('mouseover', this.onMarkerOver)

                // set the mouseout callback...
              //  .on('mouseout', this.onMarkerOut)


                // you can also listen to click and tap events :
              .on('click', this.getGallery)
              .on('tap', this.getGallery)
*/

              button.mousedown = this.onMarkerDown.bind(undefined, button);
              button.pointerdown = this.onMarkerDown.bind(undefined, button);
              button.mouseup = this.onMarkerUp.bind(undefined, button);
              button.pointerup = this.onMarkerUp.bind(undefined, button);
              button.mouseupoutside = this.onMarkerUp.bind(undefined, button);
              button.pointerupoutside = this.onMarkerUp.bind(undefined, button);
              button.mouseover = this.onMarkerOver.bind(undefined, button);
              button.pointerover = this.onMarkerOver.bind(undefined, button);
              button.touchstart = this.onMarkerOver.bind(undefined, button);
              button.mouseout = this.onMarkerOut.bind(undefined, button);
              button.pointerout = this.onMarkerOut.bind(undefined, button);
              button.touchend = this.onMarkerOut.bind(undefined, button);
              button.touchendoutside = this.onMarkerOut.bind(undefined, button);


              button.on('click', this.getGallery)
              button.on('tap', this.getGallery)
              button.on('pointertap', this.getGallery)


              TweenMax.fromTo(button, 2, {alpha:0},{alpha:1, ease:Power2.easeOut, delay: 1+ (i/10)});
               // TweenLite.to($box, 0.7, {x: '-=200px', y: '-100%', ease:Back.easeInOut, delay: 3}
          //button.tap = noop;
         // button.click = noop;
            // add it to the stage
           //  stage.addChild(button);
            marker_container.addChild(button);
            

            // add button to array
            buttons.push(button);
        }
      },
      hideMarkersNow: function(){

        TweenMax.killAll();

        marker_container.position.x = 1000;

        for (var i = 0; i < buttons.length; i++)
        {
            buttons[i].alpha=0;

            //buttons[1].visible =false;
            //console.log('buttons='+buttons[i].alpha)
        }
   
      },
      hideMarkers: function(){

        for (var i = 0; i < buttons.length; i++)
        {
              TweenMax.to(buttons[i], 1,{alpha:0, ease:Power2.easeOut, delay: (i/30)});
        }
      },
      showMarkers: function(){
         marker_container.position.x =0;
        for (var i = 0; i < buttons.length; i++)
        {
              TweenMax.to(buttons[i], 1, {alpha:1, ease:Power2.easeOut, delay: (i/30)});
        }
      },

      onMarkerDown: function(obj, e){

       TweenMax.to(obj.scale, 0.2, {x:"-=.1",y:"-=.1" , ease: Power2.easeOut});

        //console.log('onMarkerDown');
     //  alert('touched');

      },
      onMarkerUp: function(obj, e){
        
        TweenMax.to(obj.scale, 0.2, {x:"+=.1",y:"+=.1" , ease: Power2.easeOut});
        //console.log('onMarkerUp');
       // obj.tint = null;

      },
      onMarkerOver: function(obj, e){
       // //console.log("OVER:" + obj, e);

       $('#caption').addClass('active');

       if (obj.val == "mantle01" 
        || obj.val =="mantle02" 
        || obj.val =="mantle03" 
        || obj.val =="mantle04"){

        $('#caption').text('Decorate your mantle' )

       }else if (obj.val == "stocking01" || 
        obj.val =="stocking02" || 
        obj.val =="stocking03" || 
        obj.val =="stocking04"){

        $('#caption').text('Add your stockings' )

       }else if (obj.val == "mantlepiece" ){
         $('#caption').text('Add a garland' )
       }else{
         $('#caption').text('Change this '+obj.val )
       }

      var targObj = eval(obj.val);

     //   TweenMax.to(targObj.scale, 1, {x:"+=.01",y:"+=.01" , ease: Power2.easeOut});

         TweenMax.to(targObj, 0.5, {colorProps: {
              tint: 0xEDE6AF, format:"number"
            }, ease: Power2.easeOut
          });

     TweenMax.to(obj, 0.2, {colorProps: {
              tint: 0xFF0000, format:"number"
            }, ease: Power2.easeOut
          });
      




        

      },
      onMarkerOut: function(obj, e){
       // //console.log("OUT:"+obj, e);
        $('#caption').removeClass('active');
        
        var targObj = eval(obj.val);

     //   TweenMax.to(targObj.scale, 0.5, {x:"-=.01",y:"-=.01", ease: Power2.easeOut});

        TweenMax.to(targObj, 0.5, {colorProps: {
              tint: 0xFFFFFF, format:"number"
            }, ease: Power2.easeOut
          });

       TweenMax.to(obj, 0.2, {colorProps: {
              tint: 0xFFFFFF, format:"number"
            }, ease: Power2.easeOut
          });


      },
      onStageOver: function(evt){
       // //console.log('over stage');
       // marker_container.position.x = 0;
        this.showMarkers();
        

      },
      onStageOut: function(evt){
        ////console.log('out stage');
        //marker_container.position.x = 800;
         this.hideMarkers();

      },
      onStageFlash: function(evt){

        for (var i = 0; i < buttons.length; i++)
        {
              TweenMax.to(buttons[i], 1, {alpha:1, ease:Power2.easeOut, delay: (i/30)});
        }
        TweenMax.delayedCall(6, this.hideMarkers);

      },
      onDragStart: function(e)
      {
          // store a reference to the data
          // the reason for this is because of multitouch
          // we want to track the movement of this particular touch
          portrait.data = e.data;
          portrait.alpha = 0.5;
          portrait.dragging = true;
          portrait.counter= 0;
         // console.log('drag start');
      },
      onDragEnd: function(e)
      {
          portrait.alpha = 1;

          portrait.dragging = false;

          // set the interaction data to null
          portrait.data = null;
        //  console.log('drag end');
      },

      onDragMove: function(e)
      {
        // console.log('ondragmove')
          if (portrait.dragging)
          {
              var newPosition = e.data.getLocalPosition(stage);
              portrait.position.x = newPosition.x;
              portrait.position.y = newPosition.y;
              portrait.counter+=1;
              //console.log(portrait.counter)
             // console.log('drag move');
          }
      },
      showHelpLayouts: function(e){
        e.preventDefault();

        if ($('#help-layout').hasClass('active')){

           // $('#help-layout').removeClass('active');
            $('.active').removeClass('active');
          }else{
            $('.active').removeClass('active');
            $('#help-layout').addClass('active');
          }

        $('.m-active').removeClass('m-active');
     


      },
      closeHelp: function(e){
          e.preventDefault();
          $('.active').removeClass('active');
          $('#playlist').html('');

      },

      

      resize: function (){
        /**
         * Add listeners for canvas scaling with window resizing and device rotation
         */
        window.addEventListener('resize', this.rendererResize);
        window.addEventListener('deviceOrientation', this.rendererResize);
        this.rendererResize();
      },
      rendererResize: function () {

        /**
           * The width and height to which our graphic assets are designed for 
           * Keep in mind retina resolutions and remember to provide 2xWidth 2xHeight assets for them
           */
          var targetWidth = 500;
          var targetHeight = 500;


          var width = $('#main_block').width(),
              height = width,
              targetScale;

          var canvas = document.getElementById('mainStage')

          /**
           * Set the canvas size and display size
           * This way we can support retina graphics and make our game really crisp
           */
          canvas.width = width * window.devicePixelRatio;
          canvas.height = height * window.devicePixelRatio;
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';

          /**
           * Resize the PIXI renderer
           * Let PIXI know that we changed the size of the viewport
           */
           //console.log('RESIZING PIXI: '+ canvas.width+','+canvas.height);
          renderer.resize(canvas.width, canvas.height);

          /**
           * Scale the canvas horizontally and vertically keeping in mind the screen estate we have
           * at our disposal. This keeps the relative game dimensions in place.
           */
           if (height / targetHeight < width / targetWidth) {
               stage.scale.x = stage.scale.y = height / targetHeight;
           } else {
               stage.scale.x = stage.scale.y = width / targetWidth;
           }

          /**
           * Some sugar
           * Set the x horizontal center point of the canvas after resizing.
           * This should be used for engines which calculate object position from anchor 0.5/0.5
           */
         // stage.pivot.y = -(width * (1 / stage.scale.y) / 2) * window.devicePixelRatio;
         // stage.pivot.x = -(width * (1 / stage.scale.x) / 2) * window.devicePixelRatio;

          /**
           * iOS likes to scroll when rotating - fix that 
           */
          window.scrollTo(0, 0);
      },
      swapScene: function(n){

          //console.log('swap scene');



          $('#load-panel').addClass('active').delay(500).queue(function(next){
                  $(this).removeClass("active");
                  next();
              });

          $(".m-active").removeClass("m-active");

       
/*
        ['wallpaper', width/2, height/inc],
            ['tree', width/inc, (height/inc) * 3],
            ['frame', (width/inc)*2, (height/inc)*3],
            ['portrait', width/2, (height/2) - 100],
            ['mantle01', (width/inc)*2, (height/inc)*6],
            ['mantle02', (width/inc)*4, (height/inc)*6],
            ['mantle03', (width/inc)*6, (height/inc)*6],
            ['mantle04', (width/inc)*8, (height/inc)*6],
            ['mantlepiece', (width/inc)*9, (height/inc)*5],
            ['stocking01', (width/inc)*2, (height/inc)*7],
            ['stocking02', (width/inc)*4, (height/inc)*7],
            ['stocking03', (width/inc)*6, (height/inc)*7],
            ['stocking04', (width/inc)*8, (height/inc)*7],
            ['fireplace', width/2, (height/inc) * 8],
            ['gift', (width/inc)*9, (height/inc) * 8]
*/

          var path = "./static/images/";
            var ext = ".png";

          if (n==1){
            
            var img = path + 'wallpaper-01' + ext;
            wallpaper.setTexture(PIXI.Texture.from(img));

            var img = path + 'frame-01a' + ext;
            frame.setTexture(PIXI.Texture.from(img));

            var img = path + 'fireplace-01' + ext;
            fireplace.setTexture(PIXI.Texture.from(img));


            var img = path + 'clear' + ext;
            stocking01.setTexture(PIXI.Texture.from(img));
            stocking02.setTexture(PIXI.Texture.from(img));
            stocking03.setTexture(PIXI.Texture.from(img));
            stocking04.setTexture(PIXI.Texture.from(img));

            mantle01.setTexture(PIXI.Texture.from(img));
            mantle02.setTexture(PIXI.Texture.from(img));
            mantle03.setTexture(PIXI.Texture.from(img));
             mantle04.setTexture(PIXI.Texture.from(img));

             mantlepiece.setTexture(PIXI.Texture.from(img));
             headline.setTexture(PIXI.Texture.from(img));
          }else if (n==2){

            var img = path + 'wallpaper-02' + ext;
            wallpaper.setTexture(PIXI.Texture.from(img));

            var img = path + 'frame-02a' + ext;
            frame.setTexture(PIXI.Texture.from(img));

            var img = path + 'fireplace-03' + ext;
            fireplace.setTexture(PIXI.Texture.from(img));

            var img = path + 'bowl-03' + ext;
            mantle04.setTexture(PIXI.Texture.from(img));

            var img = path + 'stocking-05' + ext;
            stocking03.setTexture(PIXI.Texture.from(img));

            var img = path + 'clear' + ext;
            stocking01.setTexture(PIXI.Texture.from(img));
            stocking02.setTexture(PIXI.Texture.from(img));
            stocking04.setTexture(PIXI.Texture.from(img));

            mantle01.setTexture(PIXI.Texture.from(img));
            mantle02.setTexture(PIXI.Texture.from(img));
            mantle03.setTexture(PIXI.Texture.from(img));

            mantlepiece.setTexture(PIXI.Texture.from(img));
             headline.setTexture(PIXI.Texture.from(img));

          }else if (n==3){

            var img = path + 'wallpaper-04' + ext;
            wallpaper.setTexture(PIXI.Texture.from(img));

            var img = path + 'frame-04' + ext;
            frame.setTexture(PIXI.Texture.from(img));

            var img = path + 'fireplace-05' + ext;
            fireplace.setTexture(PIXI.Texture.from(img));

            var img = path + 'orn-02' + ext;
            mantle03.setTexture(PIXI.Texture.from(img));

            var img = path + 'candle-03' + ext;
            mantle04.setTexture(PIXI.Texture.from(img));

            var img = path + 'stocking-03' + ext;
            stocking02.setTexture(PIXI.Texture.from(img));

            var img = path + 'clear' + ext;
            stocking01.setTexture(PIXI.Texture.from(img));
            stocking03.setTexture(PIXI.Texture.from(img));
            stocking04.setTexture(PIXI.Texture.from(img));

            mantle01.setTexture(PIXI.Texture.from(img));
            mantle02.setTexture(PIXI.Texture.from(img));

            mantlepiece.setTexture(PIXI.Texture.from(img));
             headline.setTexture(PIXI.Texture.from(img));


          }
/*
            var img = path + setting.gift[n] + ext;
            gift.setTexture(PIXI.Texture.from(img));
            */

         //   var img = path + setting.tree[n] + ext;
         //   tree.setTexture(PIXI.Texture.from(img));

/*
              setting.wallpaper[n]+'.png';
              setting.frame[n]+'.png';
              setting.mantle[n]+'.png';
              setting.stockings[n]+'.png';
              setting.mantlepiece[n]+'.png';
              setting.fireplace[n]+'.png';
              setting.gift[n]+'.png';
              setting.tree[n]+'.png';


        var texture01 = PIXI.Texture.from(path)
        obj.setTexture(texture01);
        */
      },

      getGallery: function(evt){
       // //console.dir(evt);
       // alert("target ="+ evt.target.val)
        $('#photo_block').addClass('m-active');
        if (evt.target.val == "portrait"){
          this.$router.push({ name: 'photos'});

        }else{
/*
        else if (evt.target.val == "mantle01" 
          || evt.target.val =="mantle02" 
          || evt.target.val =="mantle03" 
          || evt.target.val =="mantle04"){
          this.$router.push({ name: 'gallery', params : { 'imgset': 'mantle' }});
        }else if (evt.target.val == "stocking01" || 
          evt.target.val =="stocking02" || 
          evt.target.val =="stocking03" || 
          evt.target.val =="stocking04"){
          this.$router.push({ name: 'gallery', params : { 'imgset': 'stockings' }});
        }else{
          */
          this.$router.push({ name: 'gallery', params : { 'imgset': evt.target.val }});
        }
        

      },
      postToFacebook: function(msg, img){
        $('#load-panel').addClass('active');
        // Create facebook post using image
        var scope = this;
        FB.api(
            "/me/feed",
            "post",
            {
                //"message": "Share Your Most Wonderful Mantlepiece of Christmas",
                "picture": img, //'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',//response.images[0].source,
                "link": window.location.href,
                "name": 'Share Your Most Wonderful Mantlepiece of Christmas',
                "description": 'I just created my perfect Christmas Hearth full of decorations and family photos. You can create one, too!'//,
                //"privacy": {
                  //  value: 'SELF'
                //}
            },
            function (response) {
             // console.log('feedback: '+response)
              //console.dir(response);
                if (response && !response.error) {
                    /* handle the result */
                    //console.log("Posted story to facebook");
                    //console.log(response);
                    $('#load-panel').removeClass('active');
                    scope.toggleIframe();
                    $('#thanks').addClass('active');

                }
            }
        );
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
      postToTwitter: function(blob){
          var scope = this;
       /*   marker_container.position.x = 1000;
          var scope = this;

          setTimeout(function(){
              $('#load-panel').addClass('active');

          var data = $('#mainStage')[0].toDataURL("image/png");
          var blob = scope.dataURItoBlob(data);
*/
       //   var blob = scope.dataURItoBlob(img);

        // alert(data);

          var formData = new FormData();
         // formData.append("file", blob);
          formData.append('image', blob, 'filename');
          //formData.append('image', data, 'filename');
         // formData.append('image', data);
         // formData.append("canvasImage", blob);

          var xhr = new XMLHttpRequest();
          //request.onload = this.completeRequest;
     

          xhr.onload = function () {
          if (xhr.readyState === xhr.DONE) {
                  if (xhr.status === 200) {

                     // //console.log('ALL GOOD')
                      $('#load-panel').removeClass('active');
                      scope.toggleIframe();
                    $('#thanks').addClass('active');
                  }
              }
          };


          xhr.open("POST", "/upload/twitter_status");
          xhr.send(formData);

     //     }, 500);
        
           
          
          
      },
      resizeWideFrame: function(evt, targ){
          $('#load-panel').addClass('active');
         //this.hideMarkersNow();
         var targ = 'facebook';
         marker_container.position.x = 1000;
         // requestAnimationFrame(this.animate);
        // alert(marker_container.position.x);
         

         var mainstage = $('#mainStage')[0];

         var canvas = document.createElement('canvas');
          // create an off-screen canvas
      /*    var elementID = 'canvas' + $('canvas').length; // Unique ID

          $('<canvas>').attr({
              id: elementID
          }).css({
              width: '800px',
              height: '800px',
              display: 'none'
          }).appendTo('body');

        var canvas = document.getElementById(elementID);
        */
        var ctx = canvas.getContext('2d');

        var width = 1200;
        var height = 630;

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        // delay to remove markers
        setTimeout(this.drawPost, 100, width, height, ctx, canvas, mainstage, targ);
      },
      resizeOutput: function(evt, targ){
          $('#load-panel').addClass('active');
         //this.hideMarkersNow();
         marker_container.position.x = 1000;
         // requestAnimationFrame(this.animate);
        // alert(marker_container.position.x);
         

         var mainstage = $('#mainStage')[0];

         var canvas = document.createElement('canvas');
          // create an off-screen canvas
      /*    var elementID = 'canvas' + $('canvas').length; // Unique ID

          $('<canvas>').attr({
              id: elementID
          }).css({
              width: '800px',
              height: '800px',
              display: 'none'
          }).appendTo('body');

        var canvas = document.getElementById(elementID);
        */
        var ctx = canvas.getContext('2d');

        var width = 1200;
        var height = 1200;

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        // delay to remove markers
        setTimeout(this.drawPost, 100, width, height, ctx, canvas, mainstage, targ);

        

           

            
      //    }

      },
      drawPost: function (w, h, ctx, canvas, mainstage, targ){

          // draw source image into the off-screen canvas:

          if (h > 1000){
            ctx.drawImage(mainstage, 95, 95, 1010, 1010);
            ctx.drawImage(this.square_frame, 0, 0, 1200, 1200);
          }else{
            ctx.drawImage(this.wide_frame, 0, 0, w, h);
            ctx.drawImage(mainstage, 285, 0, 630, 630);
            ctx.strokeStyle = "#b70000";
            ctx.lineWidth = 10;
            ctx.strokeRect(290, 5, 625, 620);
          }
       // alert(canvas.toDataURL())

      // var scope = this;
/*
       var image = new Image();
      //  image.src = './static/images/message-0'+this.selectedMsg+'.png';
        image.src = './static/images/message-01.png';
 
        image.onload = function () {

            ctx.drawImage(image, canvas.width / 2 - image.width / 2, 40 )
      

            
        }
*/
    //    var base_image = new Image();
    //    base_image.src = './static/images/photoframe.png';

        //console.log('before load---'+ctx);
    //    base_image.onload = function(){
          //console.log('after load---'+ctx);
          
           // scope.hideMarkersNow();

            var data= canvas.toDataURL("image/png");

            var blob = this.dataURItoBlob(data);

           // Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
          // var canvas = document.getElementById("canvas1"), ctx = canvas.getContext("2d");
          //console.log(scope.browser)
          if (targ == 'facebook'){

              var formData = new FormData();
             // formData.append("file", blob);
              formData.append('image', blob, 'filename');

              var xhr = new XMLHttpRequest();
              //request.onload = this.completeRequest;
              var scope = this;

              xhr.onload = function () {
              if (xhr.readyState === xhr.DONE) {
                      if (xhr.status === 200) {
                        var gcloud = JSON.parse(xhr.response);
                          //console.log(gcloud.uploaded)
                          //console.log(xhr.response);
                          ////console.log(xhr.responseText);
                          scope.postToFacebook('custom message here', gcloud.uploaded)
                      }
                  }
              };


              xhr.open("POST", "/upload/add");
              xhr.send(formData);

          }else if (targ == 'twitter'){

           
            this.postToTwitter(blob);

          }else if (this.browser == "Safari"){

             // var dt = document.getElementById("canvas1").toDataURL('image/png');
              var dt = data;
             // alert('safari');

              /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
        //      dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

              /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
        //      dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
              setTimeout(function(){ 
                $('#load-panel').removeClass('active');
              }, 1000);
              
             //x evt.target.href = dt;
             // window.open(data, '_blank');
             //console.log('safari----------------')
             var url = (window.webkitURL || window.URL).createObjectURL(blob);
             //console.log(url);
            // location.href = url;
             window.open(url, '_blank');

            // TweenMax.delayedCall(.9, dlSafari, url);
            // setTimeout(function(){ window.open(url, '_blank'); }, 1000);

          }else if (this.browser == "Mobile Safari"){
            // var url = (window.webkitURL || window.URL).createObjectURL(blob);
             //console.log('mobile- '+url);
             setTimeout(function(){ 
                $('#load-panel').removeClass('active');
              }, 1000);
             /// Works in own window///
            // location.href = url;

           //  var dt = document.getElementById("mainStage").toDataURL('image/png');
            window.open(data, '_blank');
           // setTimeout(function(){ window.open(data, '_blank');}, 900);

            // TweenMax.delayedCall(.9, dlMobile, url);
            // setTimeout(function(){ location.href = url;}, 1000);
       
          }else{

              setTimeout(function(){ 
                $('#load-panel').removeClass('active');
              }, 1000);

              canvas.toBlob(function(blob) {
                FileSaver.saveAs(blob, "Hallmark_mantlepiece.png");
            });
          }

      },
      dlMobile:function(url){

          //var dt = document.getElementById("canvas1").toDataURL('image/png');
          //window.open(dt, '_blank');
          location.href = url;
      },
      dlSafari:function(url){

        window.open(url, '_blank');

        // var dt = document.getElementById("canvas1").toDataURL('image/png');
          //alert(dt);

          /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
       //   dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

          /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
       //   dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

          
          evt.target.href = dt;
      },
 //// NOT USING THIS??
      resizedataURL: function()
      {
        marker_container.position.x = 1000;
        $('#load-panel').addClass('active');

         var mainstage = $('#mainStage')[0]
        // create an off-screen canvas
        var elementID = 'canvas' + $('canvas').length; // Unique ID

        $('<canvas>').attr({
            id: elementID
        }).css({
            width: '1200px',
            height: '1200px',
            display: 'none'
        }).appendTo('body');

        var canvas = document.getElementById(elementID);
        var ctx = canvas.getContext('2d');

        var width = 1200;
        var height = 1200;

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        // draw source image into the off-screen canvas:
        ctx.drawImage(mainstage, 95, 95, 1010, 1010);
       // alert(canvas.toDataURL())

       var scope = this;

     /*  var image = new Image();
        image.src = './static/images/message-0'+this.selectedMsg+'.png';
 
        image.onload = function () {

            ctx.drawImage(image, canvas.width / 2 - image.width / 2, 40 )
        }
        */

        var base_image = new Image();
        base_image.src = './static/images/photoframe.png';
        base_image.onload = function(){
          ctx.drawImage(base_image, 0, 0, 1200, 1200);
          scope.hideMarkersNow();

          var data= canvas.toDataURL("image/png");

          var blob = scope.dataURItoBlob(data);

          scope.postImageToFacebookAlbum(scope.accessToken, blob, 'message')
        }


      },

      uploadCanvasData: function()
      {

          $('#load-panel').addClass('active');

          var data = $('#mainStage')[0].toDataURL("image/png");
          var blob = this.dataURItoBlob(data);

          var formData = new FormData();
         // formData.append("file", blob);
          formData.append('image', blob, 'filename');

          var xhr = new XMLHttpRequest();
          //request.onload = this.completeRequest;
          var scope = this;

          xhr.onload = function () {
          if (xhr.readyState === xhr.DONE) {
                  if (xhr.status === 200) {
                    var gcloud = JSON.parse(xhr.response);
                      //console.log(gcloud.uploaded)
                      //console.log(xhr.response);
                      ////console.log(xhr.responseText);
                      scope.postToFacebook('custom message here', gcloud.uploaded)
                  }
              }
          };


          xhr.open("POST", "/upload/add");
          xhr.send(formData);
      },
      completeRequest: function(response){
        //alert('completed '+ response);
        //console.log(response)
       //this.postToFacebook()
      },
      /*
      checkFacebookLogin: function(){
        //console.log('check' + FB)
        FB.getLoginStatus(function(response) {
          //console.log(response);
        });
      },
      */
      uploadToAlbum: function(){
        //console.log('active?'+ $('#load-panel').hassClass('active'))
        $('#load-panel').addClass('active');
        var data = $('#mainStage')[0].toDataURL("image/png");
        var blob = this.dataURItoBlob(data);
        this.postImageToFacebookAlbum(this.accessToken, blob, 'message')
      },
      postImageToFacebookAlbum(token, imageData, message) {
            var fd = new FormData();
            fd.append("access_token", token);
            fd.append("source", imageData);
            fd.append("message","I just created my perfect Christmas Hearth full of decorations and family photos. Please check it out! http://www.hallmarkmoviesandmysteries.com");
           // fd.append("no_story", true);
           var scope = this;
            // Upload image to facebook without story(post to feed)
            $.ajax({
                url: "https://graph.facebook.com/me/photos?access_token=" + token,
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    //console.log("success: ", data);

                    // Get image source url
                    FB.api(
                        "/" + data.id + "?fields=images",
                        function (response) {
                            if (response && !response.error) {
                              //console.log("go post to wall!!!!!!");
                              $('#load-panel').removeClass('active');
                                //console.log(response.images[0].source);

                            }
                        }
                    );
                },
                error: function (shr, status, data) {
                    //console.log("error " + data + " Status " + shr.status);
                     $('#load-panel').removeClass('active');
                },
                complete: function (data) {
                    //console.log('Post to facebook Complete');
                    scope.toggleIframe();
                    $('#thanks').addClass('active');
                   // $('#thanks').addClass('active');
                }
            });
        },
        toggleIframe:function(){
          /*
            if ($('#playlist').has('iframe')){
                $('#playlist').html('');
            }else{
              */
                var w, h;

                if ($('.header').width() < 600){
                    w = 300;
                    h = 236;
                }else{
                    w = 400;
                    h = 315;
                }


                 $('#playlist').append('<iframe width="'+w+'" height="'+h+'" src="https://www.youtube.com/embed/videoseries?list=PLIOAH7QdikJwFwgGeZ_Do8Ztaa4IDLT65" frameborder="0" allowfullscreen></iframe>');
        
          //  }

         },
         gaEvent: function(action){
      
              ga('send', {
                hitType: 'event',
                eventCategory: 'Social',
                eventAction: action,
                eventLabel: 'Hallmark Mantlepiece of Christmas'
              });
           
         },
         downloadClick: function(){
              this.resizeOutput();
              this.gaEvent('Download Image');
         },

        getFBstatus: function(callback){

          this.gaEvent('Facebook Share');
          marker_container.position.x = 1000;
           requestAnimationFrame(this.animate);



         // this.FBlogin(this.statusChangeCallback);

         if (this.accessToken==''){
          //console.log('NO TOKEN HERE')
           // this.FBlogin(callback);
            if (callback=='gallery') {
              this.FBlogin(this.getFacebookGallery);
            }else if (callback=='album') {
              $('#load-panel').addClass('active');
              this.FBlogin(this.uploadToAlbum);
            }else{
              this.FBlogin(this.resizeWideFrame);
              //this.resizeWideFrame(null, 'facebook');
             // this.FBlogin(this.uploadCanvasData);

             // this.FBlogin(this.resizedataURL);


            }
         }else{
          //console.log('GOT TOKEN ALREADY')
            //callback();
             if (callback=='gallery') {
              this.getFacebookGallery();
            }else if (callback=='album') {
              $('#load-panel').addClass('active');
              this.uploadToAlbum();
            }else{

              this.resizeWideFrame(null, 'facebook');
             // this.uploadCanvasData();
            //  this.resizedataURL();

            }
         }

        },


        FBlogin( callback ) {
          var scope = this;
          FB.login(function(response) {
            if (response.authResponse) {
              //console.log('Welcome!  Fetching your information.... ');
              scope.accessToken = response.authResponse.accessToken || '';
              //console.log("SET ACCESS TOKEN "+ scope.accessToken);
              //console.log('Logged into app and Facebook.');
              if (callback) {
                callback(response);
              }
            } else if (response.status === 'not_authorized') {
              ////console.log('User cancelled login or did not fully authorize.');
              //console.log('The person is logged into Facebook, but not your app.');

            } else {
              //console.log('Not logged in to Facebook')
            }
          }, {
              scope: 'user_photos,publish_actions', 
              return_scopes: true
          });
        },
        getFacebookGallery: function(){

          $('#load-panel').addClass('active');
          //console.log('ACCESSTOKEN = '+this.accessToken)
          ////console.log('outside router='+ this.router)
          //passed scope through getPhotos callback???
          var scope = this;
          this.getPhotos( this, function( photos ) {
            //console.log("**********READY**********")
            //console.dir(photos);
            //console.log('url======'+photos[0].url);
            $('#load-panel').removeClass('active');
            scope.$router.push({ name: 'gallery', params : { 'fbset': photos, 'imgset': 'facebook' }});
         // router.push({ path: 'album', params : { imgset: 'backgrounds' }});
           // router.push('album');
            
            ////console.log('****'+photos[0].url)
           // self.imageToCanvas(photos[0].url, photos[0].name);
            
          });
        },
        getPhotos(scope, callback) {

          //var allPhotos = [];

          //var accessToken = '';
          var scope = this;
         // scope.login(function(loginResponse) {
          //    scope.accessToken = loginResponse.authResponse.accessToken || '';
              scope.getAlbums(function(albumResponse) {
                  //console.dir(albumResponse);
                  var i, album, deferreds = {}, listOfDeferreds = [];

                  for (i = 0; i < albumResponse.data.length; i++) {
                    album = albumResponse.data[i];
                    //console.log(album.name);
                    deferreds[album.id] = $.Deferred();
                    listOfDeferreds.push( deferreds[album.id] );
                    scope.getPhotosForAlbumId( album.id, album.name, function( albumId, albumName, albumPhotosResponse ) {
                        var i, facebookPhoto;
                        //console.dir(albumPhotosResponse );
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
           // });
        },
        getAlbums( callback ) {
          FB.api(
              '/me/albums',
              {fields: 'id,cover_photo,name'},
              function(albumResponse) {
                //console.log( ' got albums ' );
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
                //console.log( ' got photos for album ' + albumId );
                ////console.dir(albumPhotosResponse);
                if (callback) {
                  callback( albumId, albumName, albumPhotosResponse );
                }
              }
            );
        },
        makeFacebookPhotoURL( id, accessToken ) {
          var path = 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
          //console.log(path);
          $('#images').append('<img src="'+path+'" height="64px" width="64px">');
          return path;
        },
        showMessages: function(){
          $('.m-active').removeClass('m-active');
          //console.log('show messages panel');
          $('#photo_block').addClass('m-active');
        },
        showLayouts: function(){
          $('.m-active').removeClass('m-active');
          //console.log('show layouts panel');
          $('#layout_block').addClass('m-active');

        }
        /*
        statusChangeCallback(response) {
          //console.log('statusChangeCallback');
          //console.log(response);
          // The response object is returned with a status field that lets the
          // app know the current login status of the person.
          // Full docs on the response object can be found in the documentation
          // for FB.getLoginStatus().
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            //testAPI();
            //console.log('Logged into app and Facebook.');
            return true;
          } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            //console.log('The person is logged into Facebook, but not your app.');
            return false;
            //document.getElementById('status').innerHTML = 'Please log ' +'into this app.';
          } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            //console.log('Not logged in to Facebook')
            return false;
           // document.getElementById('status').innerHTML = 'Please log ' +'into Facebook.';
          }
        },
        */

  }
}

</script>

<style lang="scss">

@font-face {
    font-family: 'bebas_neueregular';
    src: url('assets/fonts/bebasneue-webfont.woff2') format('woff2'),
         url('assets/fonts/bebasneue-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}

//$trans-yellow: rgba(248, 249, 174, 0.52);
$trans-yellow:rgba(254, 252, 232, 0.6);

html {
  height: 100%;
  background: url(./assets/GoldenGlitter.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
 // overflow: hidden;
}

body {
 // display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  //overflow: hidden;
  margin: 0px;
  box-sizing: border-box;
  font-size: 14px;

}

ol li,
p{
  font-family: Source Sans Pro, Helvetica, sans-serif;
    
}

button:focus {outline:0;}

a.help{
      background: #666;
    border-radius: 16px;
    color: #ffffff;
    display: inline-block;
    /* font-weight: bold; */
    line-height: 16px;
    -ms-flex-pack: center;
    justify-content: center;
    margin-left: 3px;
    text-align: center;
    width: 16px;
    font-size: 16px;
    transition: all .3s ease-out;
    position: absolute;
    top: 35%;
    /* right: 0; */
    //font-size: 0.5em;

    &:hover{
         background: #cf151b;
    }
}

#app {
  //color: #2c3e50;
 // background-color: $trans-yellow;
  //border: 1px solid red;
  //margin-top: -100px;
  width: 100vw;
 // height: 100%;
 // height: 100vh;
  max-width: 1200px;//1366px;
  font-family: 'bebas_neueregular', Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  font-weight: normal;

 // min-height: 100vh;
  margin: 0 auto;
 // display: flex;
 // flex-direction: column;

}

.longbtn{
  display: block;
}

.shortbtn{
  display: none;
}

#app a {
 // color: #42b983;
  text-decoration: none;
}

h1{
    font-weight: normal;
    font-size: 24px;
    color: #cf151b;
    letter-spacing: 1.5px;
    margin: 0;
    padding: 15px;
    position: relative;
}

.logo {
 // width: 100px;
 // height: 100px
 align-self: center
}


.transparent{
  background-color: $trans-yellow;
  //border: solid 1px blue;
  //mix-blend-mode: overlay;
  //position: relative;
 // width: 100%;
  //height: 100%;
  height: calc(100vh - 215px);

    min-height: 400px;
    max-height: 550px;
  //box-shadow: 0px 0px 40px 2px rgba(0,0,0,0.25);
  box-shadow: rgba(255, 206, 84, 0.5) 0px 0px 40px 2px;
  //z-index: 4;

 // overflow-x: hidden;
 // overflow-y: scroll;

}


#main_block .transparent{
  display: flex;
  position: relative;
      margin: 0 auto;
    max-width: 500px;
}




#mainStage{
 // width: 100%;
 // height: 100%;
  margin: 0 auto;
  align-self: center;
  justify-content: center;
  background-color: lightgrey;
  max-width: 500px;
  //padding: 10px;
 //position: absolute;
 //top: 0;
 //left: 0;
 //z-index: -1;
}

#photo_block{
  position: relative;
}


.content-block{
  color: white;
 // float: left;
 // border: solid 1px red;
  //padding: 10px;
  padding: 0 10px;
  //display: flex; 
  //flex-direction: column;
  overflow: hidden;
 // display: flex;
 // flex-direction: column;
  height:100%

}




.wrapper, .header {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;  
  
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  
  font-weight: bold;
  text-align: center;
}

.wrapper > * ,
.header > * {
 // padding: 10px;
  flex: 1 100%;
}

.header {
  //background: tomato;
  //height: 125px;
  width: 100vw;
 // height: 100vh;
  max-width: 1366px;

  img {
    max-width: 100%;
  }
}

.footer {
  //background: lightgreen;
 // height: 100px;

  img {
    max-width: 100%;
        margin-top: 20px;
  }
}

.main {
 // text-align: center;
  //background: deepskyblue;
 // max-width: 500px;
}

.aside-1 {
  //background: gold;
}

.aside-2 {
  //background: hotpink;
}

#layout_title,
#main_title,
#photos_title{
  //padding: 10px;

}

#caption{
    position: absolute;
    margin: 5px auto;
    width: 100%;
    opacity: 0;
    text-shadow: rgba(0, 0, 0, 0.5) 1px 3px 5px;
    transform: translateY(-50px);
    transition: all .3s ease-in-out .2s;
    background-color: #cf151b;

    height: 20px;
}

#caption.active{
    opacity: 1;
    transform: translateY(0px);
}

.aside { flex: 1; }
  
  .aside-1 { order: 1; } 
  .main    { order: 2; flex:2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }


#social_action{
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 100%;
}

.help-panel{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    color: black;


 //   display: none;
    background-color: rgba(251, 247, 216, .9);
    
    width: 100%;
    height: 100%;
    position: absolute;
  //  display: flex;
    align-items: center;
   // opacity: 0;
    transition: opacity .25s ease-out;
    pointer-events:none;
    flex-direction: column;
    color: #3c3b3b;
 
}

#help-layout{
    opacity: 0;
    transition: opacity .25s ease-out;
   pointer-events:none;



}

#help-layout.active{
    opacity: 1;
    pointer-events: auto;
  
}

#help-photos{
    opacity: 0;
    transition: opacity .25s ease-out;
   pointer-events:none;



}

#help-photos.active{
    opacity: 1;
    pointer-events: auto;
  
}

#help-layout-close{
  position: absolute;
  top: 20px;
  right: 10px;

}

#help-photos-close{
  position: absolute;
  top: 20px;
  right: 10px;
  
}

#thanks-close{
  position: absolute;
  top: 20px;
  right: 10px;
      z-index: 4;
  
}



.scroll{
  width: 90%;
  height: calc(100% - 66px);
  margin: 0 auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  max-height: 100%;

    justify-content: center;
    display: flex;

    flex-flow: row wrap;

    img{
      max-width: 100%;
    }
}

#scene-scroll{


  img{
    //float:left;
    //width: 100%;
    //transform: scale(.9,.9)
    display: block;
      width: 100% !important;
      height: auto !important;
          max-width: 200px;
    //  margin-bottom: 5px;
  }
  
}

.scroll::-webkit-scrollbar {
    width: .3em;
}
 
.scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
 
.scroll::-webkit-scrollbar-thumb {
  background-color: red;
  outline: 1px solid slategrey;
}

@import url(http://fonts.googleapis.com/css?family=Merriweather+Sans);
.social {
    padding-left: 45px;
    height: 36px;
    background: none;
    border: none;
    display: block;
    background-size: 35px 35px;
    background-position: left center;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: white;
    font-family:"Merriweather Sans", sans-serif;
    font-size: 14px;
    margin-bottom: 15px;
    width: 205px;
    border-bottom: 2px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    box-shadow: 0 4px 2px -2px gray;
    text-shadow: rgba(0, 0, 0, .5) -1px -1px 0;
    margin: 8px auto;
    transition: all .25s ease-out;

  
    
}

.shortbtn{
  display: none;
}

.longbtn{
  display: block;
}



button#layout_btn {
    border-color: #2d5073;
    background-color: #3b5998;
    cursor:pointer;
    text-transform: uppercase;
    padding: 0;
    font-family: 'bebas_neueregular', Source Sans Pro, Helvetica, sans-serif;
        font-size: 18px;
    letter-spacing: 1px;
    background-color: #e8d69e;
    color: #cf151b;
    text-shadow: none;
   
}

button#message_btn {
    border-color: #2d5073;
    background-color: #3b5998;
    cursor:pointer;
    text-transform: uppercase;
    font-family: 'bebas_neueregular', Source Sans Pro, Helvetica, sans-serif;
        font-size: 18px;
    letter-spacing: 1px;
    padding: 0;
    background-color: #e8d69e;
    color: #cf151b;
    text-shadow: none;
   
}

button#facebook {
    border-color: #2d5073;
    background-color: #3b5998;
    background-image: url(http://icons.iconarchive.com/icons/danleech/simple/512/facebook-icon.png);
    cursor:pointer;
   
     &:hover{
      background-color: #4a6ea9;
    }
}

button#twitter {
    border-color: #83c0dc;
    background-color: #54bdee;
    background-image: url(http://icons.iconarchive.com/icons/danleech/simple/512/twitter-icon.png); 
    cursor:pointer; 

     &:hover{
      background-color: #32def4;
    }
}

//button#download {
a#dl{

    border-color: #83c0dc;
    background-color: #548ac3;
    background-image: url(../static/images/download_icon.svg); 
    background-size: 20% 80%;
    align-items: flex-start;
    text-align: center;
    cursor: default;
    color: white;
    box-sizing: border-box;
    padding: 8px 6px 8px 45px;
    cursor:pointer;

     &:hover{
      background-color: #83c0dc;
    }

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

textarea{
  height: 130px;
  //width: 80%;
}





#thanks{
   // background-color: rgba(0,0,0,.5);
    background-color: rgba(251, 247, 216, .9);
    
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity .25s ease-out;
   -moz-transition: opacity .25s ease-out;
   -webkit-transition: opacity .25s ease-out;
   pointer-events:none;
    flex-direction: column;
    color: #3c3b3b;


   // padding: 115px;
    padding: 10px 45px;
    box-sizing: border-box;

   p{
    width: 90%;
    text-align: center;
    margin: 0 auto;
   }

   h1{
   // text-shadow: rgba(6, 0, 0, .8) 1px 1px 0;
    font-size: 34px;
   }

}

#thanks.active{
    opacity: 1;
    pointer-events: auto;
  
}

///// loader //////

#load-panel{
    background-color: rgba(0,0,0,.5);
    
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity .25s ease-out;
   -moz-transition: opacity .25s ease-out;
   -webkit-transition: opacity .25s ease-out;
   pointer-events:none;

}

#load-panel.active{
    opacity: 1;
  
}

.spinner {
  margin: 0 auto;
  width: 70px;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #fbf7d8;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}




@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

.dz-preview{
 // display: none;
  visibility: hidden;
}

figure{
  margin: 0;
  padding: 0;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
    margin: 2px;

}

.highlight{
    opacity: .7;
    border: none;
    transform: scale(1);
    transition: all .5s ease-out;


    &:hover{
      opacity:1;
      transform: scale(1.02);
    }

    &.active{
      border: 1px solid red;
      transition: none;
      opacity:1;
      transform: scale(1);
    }

}

.carousel {
 // background: #EEE;
     width: 100%;
    
}


.carousel-cell {
  width: 100%;
  height: 160px;
 // margin: 10px;
 display: flex;

 // counter-increment: carousel-cell;
 .panel{
    align-self: center;
    width: 100%;
    height: 70%;
    margin: 0px 10px 40px;
   // margin: 0 auto;
    background: #f1dea1;
    box-sizing: border-box;
   // padding: 30px 2px;
    color: black;
    border-radius: 5px;
    box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    img{
      max-width: 100%;
      max-height: 100%;
     }

 }

 
}



.flickity-prev-next-button.previous,
.flickity-prev-next-button.next {
    width: 24px;
    height: 24px;
    top: 90%;
    z-index:2;
    background: hsl(46, 77%, 79%);
}
.flickity-page-dots {
    top: 85%;
    z-index:1;
  }
.flickity-page-dots > li.dot {

    margin: 0 6px;
    background: #dcc26a;
    opacity: .4;
}

.flickity-prev-next-button > svg > path.arrow {
    fill: #cf151b;
}


/* breakpoints        768 --- 800 -- xxx minor ---> 1366 */

@media only screen and (min-width:801px) and (max-width: 1024px){
  .transparent{

  }

  #thanks h1 {
      font-size: 26px;
  }
}

// starting at 800 +
@media all and (min-width: 801px) {
  //.main    { flex: 3 0px; }
  .aside { flex: 1; }
  
  .aside-1 { order: 1; } 
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }


  #mobile_buttons{
    display: none;
  }
}


@media only screen and (min-width:600px) and (max-width: 800px){
  //two col view

  h1{
        font-size: 22px;
  }

  #layout_title{
    display: none;
  }

  .header{
    width: 100vw;
    max-width: 1366px;
    height: 100px;//15%;

  }

  #layout_block{
        margin: 0;
    /* width: 100vw; */
    /* height: 100vw; */
    opacity: 0; 
    transition: opacity .5s ease-out;
    z-index: 9;
    pointer-events: none;
    position: relative;
    background-color: rgba(251, 247, 216, 0.9);
    /* position: absolute; */
    /* max-width: 450px; */
    /* max-height: 450px; */
    /* top: 13.5%; */
    /* width: 62.5vw; */
    /* height: 63.5vw; */
    background-color: pink;
    /* padding: 0 10px; */
    /* flex: 2; */

    display: block;
    position: absolute;
    flex: none;
   // display: none;
    top: 100px;
    left: 0;
    width: 64vw;
    height: 64vw;
    margin: 0;
    padding: 0;

    .transparent{
      height: 100%;
      min-height: 100%;
    }


  }



 #layout_block.m-active{
    opacity: 1;
    z-index: 400;
     pointer-events: auto;
  }


  #main_block{
    display: block;
    position: relative;
    flex: none;
    /* margin-top: -17vh; */
    /* max-width: 450px; */
    /* max-height: 450px; */
    float: left;
    width: 64vw;
    height: 64vw;
  }

  #photo_block{
     flex: none;
    /* float: right; */
    position: relative;
    /* width: 130px; */
    width: 29vw;
    /* height: 30vw; */
    /* margin-top: -450px; */
  }

  .main{ 
    flex: 2; 
    //order: 1;
  }

   #photo_block{
    order: 2;
   }

   .footer{
    order: 3;
   }

   #mobile_buttons{
    position: absolute;
    top: 44%;
    left: 0;
    width: 100%;
   }

   #message_btn{
    display: none;
   }

   #social_action{
    bottom: 15px;
   }

   #thanks h1{

    font-size: 22px;
    padding: 10px
   }



}



@media (min-width:371px) and (max-width:599px) {

  .social{
      font-size: 12px;
      line-height: 14px;
    }

    a#dl{
      //WHY??
      transform: translateY(6px);
     // background-position-x: 7px;
     // padding: 8px 6px 8px 35px;
    }

}


@media (max-width:599px) {


  .wrapper, .header {

   // flex-flow: column;
    display: block;
  }

  #main_block{
    height: 100vw;
    display: block;
    padding: 0px;
    margin-top: -100vw;
    z-index: 2;
    position: relative;
  }

  #mainStage{
    align-self:auto;
  }
 

  #layout_title{
    display: none;
  }

  #layout_block{
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vw;
    opacity: 0;
    transition: opacity .5s ease-out;
    z-index: 9;
     pointer-events: none;
     position: relative;
     background-color: rgba(251, 247, 216, .9);


    .transparent{
      height: 100%;
      min-height: 100%;
    }


  }
 #layout_block.m-active{
    opacity: 1;
    z-index: 400;
     pointer-events: auto;
  }
  
  #mobile_buttons{
    //display: block;

    .social{

        width: 40%;
    margin: 8px 4px;
    display: inline-block;
    }
  }

  .carousel-cell {
  height: 240px;
}

  #photo_block{
    position: relative;
    margin-top: -100vw;
    padding: 0;
    z-index: 1;



    .transparent{
      height: 100vw;
      min-height: 100vw;
      padding: 0;
      margin: 0;
      opacity: 0;
      transition: opacity .5s ease-out;
      pointer-events: none;
      background-color: rgba(251, 247, 216, .9);
    }

    &.m-active {
      z-index: 400;

      .transparent{
        opacity: 1;
        
        pointer-events: auto;
      }
    }
    
  }

  #message_block{
    height: 100%;
  }

  .carousel{
    height: 65%;

    p{
      font-size: 20px;
    }

  }



  #photos_title{
    display: none;
  }

 

  .aside { flex: 1 auto; }

  .footer{
   // order: 2;
       margin: 10px 5px;
   }

   .scene_scroll{
    height: 100vw;
   }

   .scroll{
    height: auto;
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
   }

   #layout_block figure{
    width: 30%;
    height: 30%;
   }

   figure .highlight{
      opacity: 1;
   }

   #social_action{
    position: relative;
    bottom: auto;

    h1{
          padding: 10px 0 0 0;
    }

    a#dl{
      //WHY??
    //  transform: translateY(6px);
      background-position-x: 7px;
      padding: 8px 6px 8px 35px;
    }

    .social{
      width: 30%;
      height: 33px;
      margin: 8px 4px;
      display: inline-block;
      //font-size: 12px;
      //line-height: 14px;
    }
  }

  .gallery_img{
    margin: 2px;
    width: 30%;

  }

  .gallery_img figure{

      width: 100%;
      height: 100%;

  }

  .img-gallery.scroll{
    height: 80%;
  }

  .social{
    text-shadow: none;
  }

  #thanks{
    padding: 0px;
    color: #383838;
  }

  #thanks h1{

    font-size: 18px;
    padding: 6px;
   }

   #thanks p{
    width: 100%;
   }


 
}

@media (max-width:370px) {

  a#dl{
      //WHY??
      transform: translateY(0px);

    }

.social{

      font-size: 11px;
      line-height: 12px;
      padding-left: 35px;
    }

    .longbtn{
  display: none;
}

.shortbtn{
  display: block;
}


}



@media (max-width:299px) {

.social{

      font-size: 10px;
      line-height: 11px;
      padding-left: 35px;
    }
    .shortbtn{
  display: block;
}
.longbtn{
  display: none;
}

}


</style>