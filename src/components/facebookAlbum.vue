<template>

      <div class="transparent">
        <h1>CHOOSE A PHOTO</h1>

		<div class="img-gallery scroll" v-if="assets">
	
				<div class="gallery-img" v-for="(item, index) in assets">
					<img :src="'./static/images/'+ item" />
	            </div>
	     
	
	        
	      </div>

	      <div class="img-gallery scroll" v-if="fbgallery">
	
				<div class="gallery-img" v-for="(item, index) in fbgallery">
					<img :src="item.url" />
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
    goToBar() {
      console.log('router here')
	console.log(router);


      router.push('home')
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
</style>