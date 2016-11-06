


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
	  { path: '/home', name:'home', component: Home },
    { path: '/photos', name:'photos', component: Photos },
	  { path: '/gallery/:imgset', name: 'gallery', component: facebookAlbum},
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
          appId      : '704556386364970', // hall­m­a­r­k­-greeting for Google Cloud: LIVE
          //appId      : '719330484887560', // hallmark-dev: DEV
       //   appId      : '704923129661629', // localhost  
        //  channelUrl : '//conor.lavos.local/channel.html',
          status     : true,
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8' // use graph api version 2.8
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


      ///GA
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

       ga('create', 'UA-86942674-1', 'auto');
       ga('send', 'pageview');
    }
	}).$mount('#app')

  

