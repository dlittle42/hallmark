<template>

      <div class="transparent">
        <h1>CHOOSE A PHOTO</h1>
        {{$route.params.imgset}}

		<div class="img-gallery scroll" v-if="assets">
	
				<div class="gallery-img" v-for="(item, index) in assets">
					<img v-on:click="getSrc(null, $event)" :src="'./static/images/'+ item" />
	            </div>
	     </div>

	      <div class="img-gallery scroll" v-if="fbgallery">
	
				<div class="gallery-img" v-for="(item, index) in fbgallery">
					<!--<img :src="item.url" />-->
					<div class="fbimg" v-on:click="getSrc(item.url, $event)" v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }"></div>
	            </div>
	     
	
	        
	      </div>
	</div>

</template>
<script>

import setting from '../setting';

export default {

	data: function () {
	   return {
        assets: '',
        fbgallery: ''
        
      }
	},
	mounted: function () {
	    this.$nextTick(function () {
	      // code that assumes this.$el is in-document
	      console.log('gallery mounted');
	    //  console.log(assets);
	      console.log(this.$route.params.imgset);
	      //var set = eval(this.$route.params.imgset);
	     // console.log(set)
	     if (this.$route.params.fbset){
	     	this.fbgallery = this.$route.params.fbset;
	     	console.log("fbgallery");
	     	console.dir(this.fbgallery);
	     }else{
	     	this.assets = setting[this.$route.params.imgset];
	     }
	     
	 		
	    })
	  },

  methods: {
    
    getSrc: function(img, event){
    	console.log('img='+img)
    	if (img==null){
    		var img = event.target.src;
    	}
      	this.$emit('imgSelect', img)
      	//this.$router.push('home');
	}
  },

};
</script>

<style lang="scss" scoped>
.scroll{
	width: 80%;
}

.img-gallery{
	color: black;

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