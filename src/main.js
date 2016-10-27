// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
//import App from './App'

/* eslint-disable no-new 
new Vue({
  el: '#app',
  render: h => h(App)
})
*/

/*



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
 
    // FB.getLoginStatus(function(response) {
    //    console.log(response);

    // });
   


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

*/


	import Vue from 'vue'
    import App from './App'
    import Home from './components/Home.vue'
    import Photos from './components/Photos.vue'
    import facebookAlbum from './components/facebookAlbum.vue'
	//import Post from './components/postView.vue'
    import VueRouter from 'vue-router'
   // import VueResource from 'vue-resource'
    //Vue.use(VueResource)
    Vue.use(VueRouter)

    /* eslint-disable no-new 
    new Vue({
      el: 'body',
      components: { App }
    })
	
    var router = new VueRouter({
      hashbang: false,
      history: true,
      //linkActiveClass: 'active-class'
    })
	*/
    // Define some components
   // var App = Vue.extend({});

/*
    const Foo = { template: '<div>foo</div>' }
	const Bar = { template: '<div>bar</div>' }
*/
	const routes = [
	  { path: '/home', component: Home },
    { path: '/photos', component: Photos },
	  { path: '/gallery', name: 'gallery', component: facebookAlbum},
	  { path: '*', redirect: '/home' }
	]

	const router = new VueRouter({
	  routes // short for routes: routes
	})


	const app = new Vue({
	  router,
	  render(h) {return h(App)},
    watch: {
      '$route' (to, from) {
        // react to route changes...
        console.log('watched! From '+from+' to '+to)
      }
    },
    created: function() {
      console.log('created main');
      window.fbAsyncInit = function() {
        FB.init({
       //   appId      : '704556386364970', // hall­m­a­r­k­-dev for Google Cloud
          appId      : '704923129661629', // hall­m­a­r­k­-dev - Test1 for localhost
        //  channelUrl : '//conor.lavos.local/channel.html',
          status     : true,
          cookie     : true,
          xfbml      : true,
          version    : 'v2.7' // use graph api version 2.5
        });

        //This function should be here, inside window.fbAsyncInit
       
       FB.getLoginStatus(function(response) {
          console.log(response);
       });
       


     };



      (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
	}).$mount('#app')

  

