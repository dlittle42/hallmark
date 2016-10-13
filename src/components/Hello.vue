<template>
  <div class="hello content-block">
  	<img class="logo" src="../assets/title_build_your_own.png">
  	<div class="transparent">
    	<h1>{{ msg }}</h1>
    	<canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  computed () {
  	console.log('hello computed')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1 {
  //color: #42b983;
}
.hello{
	//background-color: yellow;
	width: 30%;
	//border: 1px solid green;
	flex: 1;
  	order: 2;
}
</style>
