// use the Express package to route and answer incoming HTTP requests
var express = require('express');

var app = express();

app.get("/", function(req, res) {
	res.send("Hello World");
});

// to make the application listen to an incoming request on a port
// (e.g. port 3000)
app.listen(3000);