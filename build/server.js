var path = require("path"),  
    express = require("express");

//path.join(__dirname, "dist")

var DIST_DIR = path.join(__dirname, '..', 'dist'),  
    PORT = 8080,
    app = express();

app.use('/upload', require('../api/crud'));

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {  
  res.sendFile(path.join(DIST_DIR, "index.html"));
});



app.listen(process.env.PORT || PORT)