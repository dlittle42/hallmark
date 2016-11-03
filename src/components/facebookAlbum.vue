<template>

      <div id="gallery">
        <h1>CHOOSE ONE</h1>
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

	  // when route changes when this component is already rendered,
	  // the logic will be slightly different.
	  watch: {
	    $route () {
	    	//console.log('watch Route fired!!!');
	    	this.setGallery(this.$route.params.imgset);
	    	/*
	      this.post = null
	      getPost(this.$route.params.id, (err, post) => {
	        if (err) {
	          this.error = err.toString()
	        } else {
	          this.post = post
	        }
	      })
	      */
	    }
	  },
	mounted: function () {

	    this.$nextTick(function () {
	      // code that assumes this.$el is in-document
	      //console.log('gallery mounted');
	      //console.log($('.header').width())

	      this.setGallery(this.$route.params.imgset);
	      
	     
	 		
	    })
	  },

  methods: {
    
    getSrc: function(img, item, event){

    	if(img==null){
    		//default gallery
    		this.$emit('imgSelect', item, this.imgset)
    		//alert('set '+ this.imgset);
    	}else{
    		//fb gallery
    		//console.warn(img)
    		//$('body').prepend($('<img>',{id:'theImg',src:img}))
    		this.$emit('imgSelect', img, 'portrait')
    	}
/*
    	//console.log('img='+img)
    	if (img==null){
    		var img = event.target.src;
    	}
    	//alert(item);
      	this.$emit('imgSelect', item, this.$route.params.imgset)
      	//this.$router.push('home');
      	*/
	},
	setGallery: function(route){

		if ($('.header').width() > 599){
			$('#social_action').fadeOut();
			$('#mobile_buttons').fadeOut();

		} 

	     if (route =="facebook"){

	     	this.fbgallery = this.$route.params.fbset;
	     	//console.log("fbgallery");
	     	//console.dir(this.fbgallery);
	     }else if (route){

		     if (route == "mantle01" 
	          || route =="mantle02" 
	          || route =="mantle03" 
	          || route =="mantle04"){

	          	this.assets = setting['mantle'];

	         }else if (route == "stocking01" || 
	          route =="stocking02" || 
	          route =="stocking03" || 
	          route =="stocking04"){

	          	this.assets = setting['stockings'];

	         }else{
	         	this.assets = setting[route];
	         }

	         this.imgset = route;

	     	
	     }else{
	     	this.assets = setting[this.imgset];
	     }

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