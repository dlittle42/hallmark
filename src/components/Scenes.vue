<template>
  <div class="scenes content-block">
  	<img class="logo" src="../assets/hallmark_main_logo.png">
  	<div class="transparent">
    	<h1>{{ msg }}</h1>
    	
    	<div id="scene-scroll">
    	
	    	<img src="../assets/template1_thumb.png">
		    <img src="../assets/template2_thumb.png">
		    <img src="../assets/template1_thumb.png">
		    <img src="../assets/template1_thumb.png">
		    <img src="../assets/template2_thumb.png">
		    <img src="../assets/template1_thumb.png">
		   
    	</div>
  
   
 
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'CHOOSE A LAYOUT'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

h1 {
  //color: #42b983;
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
.transparent{
	//border:1px solid green;
	//display: flex; 
	//flex-direction: column; 
	//-webkit-justify-content: center; // Safari */
  	//justify-content: center;
	//height: 100%;
	

}

#scene-scroll{
	//border: 3px solid black;
	//background-color: yellow;
	//float: left;
	width: 90%;
	//height: 100%;
	height: calc(100% - 66px);
	margin: 0 auto;
	//overflow-x: hidden;
	//overflow-y: auto;
	overflow-y: scroll;

	-webkit-overflow-scrolling: touch;
	max-height: 100%;
	//flex-grow: 1;
	//padding: 5px;

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

#scene-scroll::-webkit-scrollbar {
    width: .3em;
}
 
#scene-scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
 
#scene-scroll::-webkit-scrollbar-thumb {
  background-color: red;
  outline: 1px solid slategrey;
}
</style>
