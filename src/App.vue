<template>
  <div id="app">
    <header>
    </header>
    <section class="content">
      <div class="columns">
        <scenes></scenes>
        <hello></hello>
        <photos></photos>
      </div>
    </section>
    <footer>
      <img src="./assets/mantlepiece_logo_footer.png">
    </footer>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Scenes from './components/Scenes'
import Photos from './components/Photos'

export default {
  components: {
    Hello,
    Scenes,
    Photos
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

.content {
  display: flex;
  flex: 1;
 // background: #999;
  color: #000; 
}

.columns{
  display: flex;
  flex:1;
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
  width: 100%;
  //height: 100%;
  height: calc(100vh - 235px);

  //box-shadow: 0px 0px 40px 2px rgba(0,0,0,0.25);
  box-shadow: rgba(255, 206, 84, 0.5) 0px 0px 40px 2px;

 // overflow-x: hidden;
 // overflow-y: scroll;

}


</style>
