<template>
  <div id="app">
  <!--
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
-->
    <header>
    </header>
    <section class="content">
      <div class="columns">
          <div class="scenes content-block">
            <router-link :to="'home'"><img class="logo" src="./assets/hallmark_main_logo.png"></router-link>
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
          <div class="main content-block">
            <img class="logo" src="./assets/title_build_your_own.png">
            <div class="transparent">

              <canvas id="mainStage"></canvas>
              <!--
              <router-link to="/photos" >
                Go to Photos
              </router-link>&nbsp;
              <router-link :to="{ name: 'gallery', params: { imgset: 'fireplaces' }}">
                Go to Fireplaces
              </router-link>&nbsp;
              <router-link :to="{ name: 'gallery', params: { imgset: 'frames' }}">
                Go to Frames
              </router-link>&nbsp;
              -->
              
            </div>
          </div>
          <div class="photos content-block">
            <img class="logo" src="./assets/title_christmas.png">
          
            <transition name="fade" mode="out-in">
              <router-view v-on:imgSelect="updateImage"></router-view>
            </transition>
          </div>

          
      </div>
    </section>
    <footer>
      <img src="./assets/mantlepiece_logo_footer.png">
    </footer>
  
</div>
</template>

<script>
var $ = require('jquery');
import router from 'vue-router';
import PIXI from 'pixi.js';
//import setting from '../setting';

var mainStage, wallpaper, stage, renderer, frame, portrait, tree, fireplace, gift;

export default {

  


  data () {
    
  
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      //scene: 'Hello Simon!'
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
       // alert('update image '+img);
       // this.imageToCanvas(img);
       //alert(img + " and "+target)
       var fullimg;
       if (img.includes('graph.facebook')){
          fullimg = img;
       }else{
          fullimg = "./static/images/"+img+ ".png";
       }
       
        this.imageToCanvas(fullimg, target);
      },
      getSrc: function(img){
            this.layout = img.srcElement.src;
            this.imageToCanvas(this.layout, 'wallpaper');
      },
      /*
      imageToCanvas: function(path){
        var can = document.getElementById('canvas');
        var ctx = can.getContext('2d');
        console.log('canvas time: '+ path);
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function(){
            //can.width = img.width;
            //can.height = img.height;


            //flip it ///
          //  ctx.translate(img.width-1, img.height-1);
           // ctx.rotate(Math.PI);
            /////////
            ctx.drawImage(img, 0, 0, can.width, can.height);
           
            
        }
        img.src = path;

      },
      */
      imageToCanvas: function(path, target){
          this.$router.push('home');
          var texture01 = PIXI.Texture.fromImage(path)
          eval(target).setTexture(texture01);

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
      drawImageProp: function (ctx, img, x, y, w, h, offsetX, offsetY) {

          if (arguments.length === 2) {
              x = y = 0;
              w = ctx.canvas.width;
              h = ctx.canvas.height;
          }

          // default offset is center
          offsetX = typeof offsetX === "number" ? offsetX : 0.5;
          offsetY = typeof offsetY === "number" ? offsetY : 0.5;

          // keep bounds [0.0, 1.0]
          if (offsetX < 0) offsetX = 0;
          if (offsetY < 0) offsetY = 0;
          if (offsetX > 1) offsetX = 1;
          if (offsetY > 1) offsetY = 1;

          var iw = img.width,
              ih = img.height,
              r = Math.min(w / iw, h / ih),
              nw = iw * r,   // new prop. width
              nh = ih * r,   // new prop. height
              cx, cy, cw, ch, ar = 1;

          // decide which gap to fill    
          if (nw < w) ar = w / nw;                             
          if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
          nw *= ar;
          nh *= ar;

          // calc source rectangle
          cw = iw / (nw / w);
          ch = ih / (nh / h);

          cx = (iw - cw) * offsetX;
          cy = (ih - ch) * offsetY;

          // make sure source rectangle is valid
          if (cx < 0) cx = 0;
          if (cy < 0) cy = 0;
          if (cw > iw) cw = iw;
          if (ch > ih) ch = ih;

          // fill image in dest. rectangle
          ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
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
          portrait.position.x = width/2;
          portrait.position.y = height/2 - 100;
          portrait.anchor.set(0.5);
          portrait.interactive = true;
          portrait.on('mousedown', this.onDown);
          portrait.on('touchstart', this.onDown);

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


        


       

        parent.setupMarkers();

        requestAnimationFrame(this.animate);

        //handle resizing
       // renderer.resize($('#mainStage').width(), $('#mainStage').height());
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

        var marker_container = new PIXI.Container();
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

      },
      onMarkerUp: function(evt){
        //portrait.scale.x -= 0.3;
       // portrait.scale.y -= 0.3;

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
        

      }

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
  overflow: hidden;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
   overflow: hidden;
  margin: 0px;

}

#app {
  //color: #2c3e50;
 // background-color: $trans-yellow;
  //border: 1px solid red;
  //margin-top: -100px;
  width: 100vw;
 // height: 100vh;
  max-width: 1366px;
  font-family: 'bebas_neueregular', Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  font-weight: normal;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

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
}

.logo {
 // width: 100px;
 // height: 100px
 align-self: center
}

#mainStage{
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}


.content {
  display: flex;
  flex: 1;
 // background: #999;
  color: #000; 
}

.columns{
  display: flex;
  flex:1;
  width: 100%;
}

.scenes{
  //background-color: green;
  //width: 30%;
  //border: 1px solid blue;
  width: 25%;
  //background: #ccc;
  order: 1;
  //height: 100%;
  
}

.main{
  //background-color: yellow;
  width: 30%;
  //border: 1px solid green;
  flex: 1;
    order: 2;
}

.photos{
  //background-color: red;
  //width: 30%;
  //border: 1px solid pink;
  width: 25%;
  order: 3;
}

.content-block{
  color: white;
 // float: left;
 // border: solid 1px red;
  padding: 10px;
  //display: flex; 
  //flex-direction: column;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height:100%

}

header{
  height: 0;//125px;
}

footer {
  height: 100px;
}

.transparent{
  background-color: $trans-yellow;
  //border: solid 1px blue;
  //mix-blend-mode: overlay;
  position: relative;
  width: 100%;
  //height: 100%;
  height: calc(100vh - 235px);

  //box-shadow: 0px 0px 40px 2px rgba(0,0,0,0.25);
  box-shadow: rgba(255, 206, 84, 0.5) 0px 0px 40px 2px;
  z-index: 4;

 // overflow-x: hidden;
 // overflow-y: scroll;

}

.scroll{
  width: 90%;
  height: calc(100% - 66px);
  margin: 0 auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  max-height: 100%;
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
    height: 35px;
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
    padding: 8px 6px;
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
  width: 80%;
}


</style>
