<template>

      <div id="gallery">
        <h1>CHOOSE A PHOTO</h1>
        <!-- {{$route.params.imgset}} -->

		<div class="img-gallery scroll" v-if="assets">
	
				<div class="gallery-img" v-for="(item, index) in assets">
				<figure>
					<img class="highlight" v-on:click="getSrc(null, item, $event)" :src="'./static/images/'+ item + '-thumb.png'" />
					</figure>
	            </div>
	     </div>

	      <div class="img-gallery scroll" v-if="fbgallery">
	
				<div class="gallery-img" v-for="(item, index) in fbgallery">
					<!--<img :src="item.url" />-->
					<figure>
					<div class="fbimg highlight" v-on:click="getSrc(item.url, null, $event)" v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }"></div>
					</figure>
	            </div>
	     
	
	        
	      </div>
	</div>

</template>
<script>

import setting from '../setting';
var $ = require('jquery');

export default {

	data: function () {
	   return {
        assets: '',
        fbgallery: '',
        imgset: 'fireplace'
        
      }
	},
	mounted: function () {
	    this.$nextTick(function () {
	      // code that assumes this.$el is in-document
	      console.log('gallery mounted');
	      console.log($('.header').width())
	      if ($('.header').width() > 599) $('#social_action').fadeOut();

	    //  console.log(assets);
	      console.log(this.$route.params.imgset);
	      //var set = eval(this.$route.params.imgset);
	     // console.log(set)
	     if (this.$route.params.fbset){
	     	this.fbgallery = this.$route.params.fbset;
	     	console.log("fbgallery");
	     	console.dir(this.fbgallery);
	     }else if (this.$route.params.imgset){
	     	this.assets = setting[this.$route.params.imgset];
	     }else{
	     	this.assets = setting[this.imgset];
	     }
	     
	 		
	    })
	  },

  methods: {
    
    getSrc: function(img, item, event){

    	if(img==null){
    		//default gallery
    		this.$emit('imgSelect', item, this.$route.params.imgset)
    	}else{
    		//fb gallery
    		console.warn(img)
    		//$('body').prepend($('<img>',{id:'theImg',src:img}))
    		this.$emit('imgSelect', img, 'portrait')
    	}
/*
    	console.log('img='+img)
    	if (img==null){
    		var img = event.target.src;
    	}
    	//alert(item);
      	this.$emit('imgSelect', item, this.$route.params.imgset)
      	//this.$router.push('home');
      	*/
	}
  },

};
</script>

<style lang="scss" scoped>
.scroll{
	//width: 80%;
}

.img-gallery{
	color: black;

}

#gallery{
	height: 100%;
	width: 100%;
}

.gallery-img{
	float: left;
	position: relative;
	margin: 2px;
}


.fbimg{
	width: 127px;
	height: 97px;
	background-size: cover;
}
</style>