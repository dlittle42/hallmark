// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

/* eslint-disable no-new 
new Vue({
  el: '#app',
  render: h => h(App)
})
*/



new Vue({
  el: '#app',
  render: h => h(App),
  created: function() {
    console.log('created main');
    window.fbAsyncInit = function() {
      FB.init({
			  appId      : '704556386364970',
			//  channelUrl : '//conor.lavos.local/channel.html',
			  status     : true,
			  cookie     : true,
			  xfbml      : true,
			  version    : 'v2.7' // use graph api version 2.5
      });

      //This function should be here, inside window.fbAsyncInit
     /*
     FB.getLoginStatus(function(response) {
        console.log(response);

     });
     */


   };



    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
  	checkLoginState() {
  		console.log('checkloginstate')
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
  }
});