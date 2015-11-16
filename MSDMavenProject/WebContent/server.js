var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var path = require("path");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.get("/orgs", function (req, res) {

	console.log("helloooooooo from server");
    
    });


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.listen(port, ip);
app.use(express.static(path.join(__dirname, '/public')));
app.listen(port, ip);