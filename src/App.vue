<template>
  <div id="app" class="wrapper">
  <!--
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
-->
    <header class="header">
      <div id="layout_title" class="aside aside-1">

        <router-link :to="'home'"><img class="logo" src="./assets/hallmark_main_logo.png"></router-link>

      </div>
      <div id="main_title" class="main">

        <img class="logo" src="./assets/title_build_your_own.png">

      </div>
      <div id="photos_title" class="aside aside-2">

        <img class="logo" src="./assets/title_christmas.png">
      </div>
    </header>
    <!--
    <section class="content">
      <div class="columns">
      -->
          <div id="layout_block" class="content-block aside aside-1">
            
            <div class="transparent">
  
              <h1>CHOOSE A LAYOUT</h1>
           
              <div id="scene-scroll" class="scroll">
              
                <img v-on:click="getSrc" src="./assets/template1_thumb.png">
                <img v-on:click="getSrc" src="./assets/template2_thumb.png">
                <img v-on:click="getSrc" src="./assets/template1_thumb.png">
                <img v-on:click="getSrc" src="./assets/template1_thumb.png">
                <img v-on:click="getSrc" src="./assets/template2_thumb.png">
                <img v-on:click="getSrc" src="./assets/template1_thumb.png">
               
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
              <div id="thanks">
              <h1>Thanks for creating and sharing your Most Wonderful Mantlepiece of Christmas!</h1>
                   <p>Remember, to keep the holiday spirit filling your home all season, watch the Most Wonderful Movies of Christmas, only on Hallmark Movies & Mysteries.</p></br>
                   <p> [Embedded YouTube playlist] </p>
              </div>
              <canvas id="mainStage"></canvas>
         

            </div>
          </div>

          <div id="photo_block" class="content-block aside aside-2">

            <div class="transparent">


              <transition name="fade" mode="out-in">
                <router-view v-on:imgSelect="updateImage"></router-view>
              </transition>
              <div id="intro">
                <img class="logo" src="./assets/title_christmas.png">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus erat non mollis gravida. Nullam laoreet neque eget turpis convallis, a posuere sapien tempor. Donec semper malesuada finibus. Vivamus eleifend.</p>

                <button id="message_btn" class="social" v-on:click="">Choose a message</button>
                <button id="layout_btn" class="social" v-on:click="">Select a layout</button>
              </div>

              <div id="social_action">
              <h1>Share Your Greeting</h1>
               <button id="facebook" class="social" v-on:click="uploadCanvasData">Share on Facebook</button>
                <button id="twitter" class="social" >Share on Twitter</button>
                <a id="dl" class="social" download="Hallmark_mantlepiece.png" href="#">Download</a> 
             <!--  <a id="up" class="social" href="#">Upload</a> -->
               </div>
         
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
var $ = require('jquery');
import router from 'vue-router';
var PIXI = require('pixi.js');
var FastClick = require('fastclick');

//import setting from '../setting';

var mainStage, wallpaper, stage, renderer, frame, portrait, tree, fireplace, gift, marker_container;

export default {

  


  data () {
    
  
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      accessToken:'unknown',
      layout: ""

    }
   
  },
  /*
  created () {
    this.animate = this.animate.bind(this)
    this.clock = new THREE.Clock()
    this.mesh = this.createOcean()
  },
  */
  mounted: function () {
    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      console.log('mounted!!!!!!!!');
      //attachFastClick(document.body);
      /*
      FastClick.attach(document.body);
      */
      $('#mainStage').height($('#main_block').width() / 1);
      $(window).resize(function(){
         $('#mainStage').height($('#mainStage').width() / 1);
      });
      
      this.setupPixi();
    })
  },
  componentUpdated (el, binding, vnode, oldVNode) { 
    console.log('updated!!!!!!!!');
  },

  methods: {
      getAlert() {
        alert('function call');
      },
      updateImage: function(img, target){
        $('#load-panel').addClass('active');
       // alert('update image '+img);
       // this.imageToCanvas(img);
       //alert(img + " and "+target)
       var fullimg;
     //  if (img.includes('graph.facebook') || img.includes('http')){
      //if(img.length >30){
      if (img.includes('access_token')){
        //image from facebook
          fullimg = img + '&.png';
       }else if (img.includes('.png') || img.includes('data:image')){
        //files from the carousel or dropzone
          fullimg = img
       }else{
          //prepopulated images from gallery
          fullimg = "./static/images/"+img+ ".png";
       }
       //console.log("FULLIMAGE="+fullimg)

       //fullimg = "https://scontent.xx.fbcdn.net/v/t1.0-9/301406_10150280973301594_716561513_n.jpg?oh=31f090bc7c4acefaa14603eeff3156b5&oe=588E9495"

     //  fullimg="https://graph.facebook.com/10153785297671594/picture?access_token=EAAKAylEi…eOGet9RgnZAJubjuwUPqo7fWUZBpvwCON03xLMjpPLdZA2kx364TmzJ5uWA4eLB86GSBXgZDZD"
        //create image to preload:

        this.imageToCanvas(fullimg, target);
      },
      getSrc: function(img){
            this.layout = img.srcElement.src;
            this.imageToCanvas(this.layout, 'wallpaper');
            $('#load-panel').addClass('active');
      },
      
      imageToCanvas: function(path, target){
          this.$router.push('home');
         // console.log('---' + path)
        //  console.log('---' + path.toString())
          //$('body').prepend($('<img>',{id:'theImg',src:path}))

          //facebook redirects a url to the image
          //fake out the PIXI loader with a faux file extension
        //  var texture01 = PIXI.Texture.from(path+'&.png')

        //  eval(target).setTexture(texture01);
        // console.log(path);
        // console.log(texture01)
         

         var dimension, image;

          image = new Image();
          image.src = path;
          image.onload = function() {
              dimension = {
                  width: image.naturalWidth,
                  height: image.naturalHeight
              };
              console.log(dimension); // Actual image dimension
            //  console.log(this.src)

              var obj = eval(target);
              var texture01 = PIXI.Texture.from(path)
              obj.setTexture(texture01);
              if (target == 'portrait'){
                var ratio = Math.max(frame.width/dimension.width,frame.height/dimension.height);
               // alert(ratio);
                obj.scale.x = obj.scale.y = ratio;
              }
              //$('#load-panel').delay(1000).removeClass('active');
              $('#load-panel').delay(500).queue(function(next){
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
        scale = 1,// window.devicePixelRatio,
        width = $('#mainStage').width(),
        height = $('#mainStage').height();
        console.log('w='+width+',h='+height);


       renderer = PIXI.autoDetectRenderer(width , height, { 
        view:canvas, 
        transparent: true,
        preserveDrawingBuffer:true 
       });
       console.dir(renderer);

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


          frame.position.x = width/2;
          frame.position.y = height/2 - 100;
          frame.anchor.set(0.5);


          var container = new PIXI.Container();
          container.position.x =0;// width / 2;
          container.position.y =0;//height / 2;
         // container.anchor.set(0.5);

          console.log(frame.width)

          portrait = PIXI.Sprite.fromImage('./static/images/portrait01.png');
          //portrait.image.crossOrigin = "anonymous";
          portrait.position.x = width/2;
          portrait.position.y = height/2 - 100;
          portrait.anchor.set(0.5);
          portrait.interactive = true;
          portrait.buttonMode = true;

         // stage.on('mousedown', this.onDragStart)
        
/*
          portrait
        // events for drag start
        .on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        // events for drag end
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        // events for drag move
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);
*/



          stage.addChild(container);
          container.addChild(portrait);
          stage.addChild(frame);

          var mask_rect = new PIXI.Graphics();
          mask_rect.beginFill(0xFF700B, 1);
          var buffer = 5;
          var adjustedX = frame.position.x - frame.width/2 + buffer;
          var adjustedY = frame.position.y - frame.height/2 +buffer;
          mask_rect.drawRect(adjustedX, adjustedY, frame.width - buffer*2, frame.height - buffer*2);
         // mask_rect.anchor.set(0.5);

          stage.addChild(mask_rect);

          container.mask = mask_rect;

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
          parent.setupMarkers();
        

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
       stage.button = true;

       //stage.on('mousedown', this.onDragStart)

     // stage

            // set the mouseover callback...
            stage.on('mouseover', this.onStageOver)
            stage.on('mouseout', this.onStageOut)

        // create a new Sprite from an image path.
       wallpaper = PIXI.Sprite.fromImage('./static/images/wallpaper-01.png');

        // center the sprite's anchor point
        //wallpaper.anchor.set(0.5);

        // move the sprite to the center of the screen
        wallpaper.width = width;
        wallpaper.height = width;
        wallpaper.position.x = width/2;
        wallpaper.position.y = height/2;
        wallpaper.anchor.set(0.5);


        stage.addChild(wallpaper);

        fireplace = PIXI.Sprite.fromImage('./static/images/fireplace-01.png');

        fireplace.scale.x = fireplace.scale.y = .6;
        fireplace.position.x = width/2;
        fireplace.position.y = height - (height/4);
        fireplace.anchor.set(0.5);
        stage.addChild(fireplace);


        gift = PIXI.Sprite.fromImage('./static/images/gift-01.png');

        gift.scale.x = gift.scale.y = .6;
        gift.position.x = width;
        gift.position.y = height;
        gift.anchor.set(1);
        stage.addChild(gift);


        tree = PIXI.Sprite.fromImage('./static/images/tree-01.png');

        tree.scale.x = tree.scale.y = .6;
        tree.position.x = 0;
        tree.position.y = 0;
        //tree.anchor.set(0.5);
        stage.addChild(tree);


        


       

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
         console.log("loading: " + resource.url);  
         //Display the precentage of files currently loaded  
         console.log("progress: " + loader.progress + "%");   
         //If you gave your files names with the `add` method, you can access  
         //them like this  
         //console.log("loading: " + resource.name);
      },
      setup: function() {  
        console.log("All files loaded");
      },
    */
      animate() {
          requestAnimationFrame(this.animate);

          // just for fun, let's rotate mr rabbit a little
         // bkgd.rotation += 0.1;

          // render the stage
          renderer.render(stage);
      },
      setupMarkers: function() {

        var width = $('#mainStage').width(),
        height = $('#mainStage').height();

        marker_container = new PIXI.DisplayObjectContainer();
        marker_container.width = width;
        marker_container.height = height;

          marker_container.position.x =0;// width / 2;
          marker_container.position.y =0;//height / 2;

        stage.addChild(marker_container);

        var buttons = [];
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


        ]

       // var noop = function () {
       //   console.log('click');
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
                .on('mouseout', this.onMarkerOut)


                // you can also listen to click and tap events :
                .on('click', this.getGallery)
                
          //button.tap = noop;
         // button.click = noop;
            // add it to the stage
            marker_container.addChild(button);
            

            // add button to array
            buttons.push(button);
        }
      },
      onMarkerDown: function(evt){
        //portrait.scale.x += 0.3;
       // portrait.scale.y += 0.3;
       var obj = eval(evt.target.val);
        obj.scale.x -= 0.01;
        obj.scale.y -= 0.01;
     //  alert('touched');

      },
      onMarkerUp: function(evt){
        //portrait.scale.x -= 0.3;
       // portrait.scale.y -= 0.3;
       var obj = eval(evt.target.val);
        obj.scale.x += 0.01;
        obj.scale.y += 0.01;

      },
      onMarkerOver: function(evt){
        var obj = eval(evt.target.val);
        console.log(obj);
        obj.scale.x += 0.01;
        obj.scale.y += 0.01;
        

      },
      onMarkerOut: function(evt){
        var obj = eval(evt.target.val);
        obj.scale.x -= 0.01;
        obj.scale.y -= 0.01;

      },
      onStageOver: function(evt){
        console.log('over stage');
        marker_container.position.x = 0;
        

      },
      onStageOut: function(evt){
        console.log('out stage');
        marker_container.position.x = 800;

      },
      onDragStart: function(event)
      {
          // store a reference to the data
          // the reason for this is because of multitouch
          // we want to track the movement of this particular touch
        //  this.data = event.data;
        //  this.alpha = 0.5;
        //  this.dragging = true;
          console.log('drag start');
      },
      onDragEnd: function()
      {
          this.alpha = 1;

          this.dragging = false;

          // set the interaction data to null
          this.data = null;
          console.log('drag end');
      },

      onDragMove: function()
      {
          if (this.dragging)
          {
              var newPosition = this.data.getLocalPosition(this.parent);
              this.position.x = newPosition.x;
              this.position.y = newPosition.y;
              console.log('drag move');
          }
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
           console.log('RESIZING PIXI: '+ canvas.width+','+canvas.height);
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
      getGallery: function(evt){
        console.log(evt.target.val)
        if (evt.target.val == "portrait"){
          this.$router.push('photos');

        }else if (evt.target.val == "mantle01" 
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
          this.$router.push({ name: 'gallery', params : { 'imgset': evt.target.val }});
        }
        

      },
      postToFacebook: function(msg, img){
        // Create facebook post using image
        FB.api(
            "/me/feed",
            "post",
            {
                //"message": "Share Your Most Wonderful Mantlepiece of Christmas",
                "picture": img, //'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',//response.images[0].source,
                "link": window.location.href,
                "name": 'Share Your Most Wonderful Mantlepiece of Christmas',
                "description": 'I just created my perfect Christmas Hearth full of decorations and family photos. Please check it out!',
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
                    $('#load-panel').removeClass('active');
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
                      console.log(gcloud.uploaded)
                      console.log(xhr.response);
                      //console.log(xhr.responseText);
                      scope.postToFacebook('custom message here', gcloud.uploaded)
                  }
              }
          };


          xhr.open("POST", "/upload/add");
          xhr.send(formData);
      },
      completeRequest: function(response){
        alert('completed '+ response);
        console.log(response)
       //this.postToFacebook()
      },
      checkFacebookLogin: function(){
        console.log('check' + FB)
        FB.getLoginStatus(function(response) {
          console.log(response);
        });
      },
      uploadToAlbum: function(){
        var data = $('#mainStage')[0].toDataURL("image/png");
        var blob = this.dataURItoBlob(data);
        this.postImageToFacebook(this.accessToken, blob, 'message')
      },
      postImageToFacebook(token, imageData, message) {
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

                            }
                        }
                    );
                },
                error: function (shr, status, data) {
                    console.log("error " + data + " Status " + shr.status);
                },
                complete: function (data) {
                    console.log('Post to facebook Complete');
                   // $('#thanks').addClass('active');
                }
            });
        },

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

}

p{
  font-family: Source Sans Pro, Helvetica, sans-serif;
    font-size: 14px;
}

#app {
  //color: #2c3e50;
 // background-color: $trans-yellow;
  //border: 1px solid red;
  //margin-top: -100px;
  width: 100vw;
 // height: 100%;
 // height: 100vh;
  max-width: 1366px;
  font-family: 'bebas_neueregular', Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  font-weight: normal;

 // min-height: 100vh;
  margin: 0 auto;
 // display: flex;
 // flex-direction: column;

}

#app a {
  color: #42b983;
  text-decoration: none;
}

h1{
    font-weight: normal;
    font-size: 24px;
    color: #cf151b;
    letter-spacing: 1.5px;
    margin: 0;
    padding: 15px;
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

  //box-shadow: 0px 0px 40px 2px rgba(0,0,0,0.25);
  box-shadow: rgba(255, 206, 84, 0.5) 0px 0px 40px 2px;
  //z-index: 4;

 // overflow-x: hidden;
 // overflow-y: scroll;

}


#main_block .transparent{
  display: flex;
  position: relative;
}




#mainStage{
  width: 100%;
  height: 100%;
  align-self: center;
  justify-content: center;
  background-color: lightgrey;
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


#social_action{
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 100%;
}

#intro{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    color: black;
}

@media (max-width:1092px) {
  #layout_block,
  #layout_title{
    display: none;
  }
  #photo_block{
  position: relative;
  }
  #photos_title{
    display: none;
  }
}

@media (min-width:1091px) {
  #intro{
    display: none;
  }
}


@media all and (max-width: 767px) {
  .aside { flex: 1 auto; }
  //.main  { max-width: 100% }
  #photo_block{
    position: absolute;
   // top: 135px;
  //  left: 0px;
    width: 100%;
    padding: 0px;
   // box-sizing: border-box;
    //opacity: .5;
    //display: none;
        pointer-events: none;

    .transparent{
      height: 100vw;
    }
  }

  #main_block {
    padding: 0;
  }

  #main_block .transparent{
    display: block;
    height: 100%;
    margin: 0 0 20px 0;
  }

  .header{
    height: 30%;
  }

  #photos_title{
    display: none;
  }
  #intro{
    display: none;
  }

  .content-block {
    position: absolute;
    top: 10vh;
    left: 0px;
    height: auto;
    display: block; 
    width: 100vw;
  }

  .footer{
    position: absolute;
    top: calc(100vw + 100px);
    left: 0;
  }

  #social_action{
    //margin-top: 80px;
  }

  #layout_block,
  #photo_block{
   // visibility: hidden;
    display: none;
    pointer-events: none;

  }

  .social{
  
    float: left;
    transform: scale(.8,.8);
    margin: 0 -7px;
    font-size: 14px;
    line-height: 16px;
  }


}

//@media all and (min-width: 600px) {
//  .aside { flex: 1; }

//}

@media all and (min-width: 768px) {
  //.main    { flex: 3 0px; }
  .aside { flex: 1; }
  .main    { flex: 2; }
  .aside-1 { order: 1; } 
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }
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
    /* flex-direction: column; */
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
      margin-bottom: 5px;
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
   
}

button#twitter {
    border-color: #83c0dc;
    background-color: #54bdee;
    background-image: url(http://icons.iconarchive.com/icons/danleech/simple/512/twitter-icon.png); 
    cursor:pointer; 
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

@media (max-width:744px) {


}

//@media (max-width:968px) {
@media (max-width:1092px) {
  #layout_block,
  #layout_title,{
    display: none;
  }

  #intro{
    display: visible;
  }
}

#thanks{
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
    flex-direction: column;
    /* align-items: center; */

   // padding: 115px;
    padding: 30% 45px;
    box-sizing: border-box;

   p{
    width: 76%;
    text-align: center;
    margin: 0 auto;
   }

   h1{
    text-shadow: rgba(6, 0, 0, .8) 1px 1px 0;
    font-size: 34px;
   }

}

#thanks.active{
    opacity: 1;
  
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


</style>
