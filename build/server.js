var path = require('path')
var express = require('express')
var config = require('../config')
//var opn = require('opn')

//var router = require('../router');

const router = express.Router()
/*

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())


app.use('/upload', require('../api/crud'));

app.use('/', router)


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
 // opn(uri)
})


*/

//Create server
var app = express();

// Configure server
app.configure( function() {

    //Don't change anything here...

    //Where to serve static content
    app.use( express.static( application_root ) );

    //Nothing changes here either...
});

//Start server --- No changes made here
var port = 5000;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

