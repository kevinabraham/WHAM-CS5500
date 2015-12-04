var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var path = require("path");

var mongoose=require('mongoose');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/User';

var db = mongoose.connect(connectionString);

var UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String
})

var User=mongoose.model("User",UserSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.get("/orgs", function (req, res) {

	console.log("helloooooooo from server");
    
    });

app.post("/rest/login", function (req, res) {

    var user = req.body;

    console.log("helloooooooo from server");
    console.log(user);
    
    //User.create(user, function (err,result) {
    //    if(err)
    //     console.log(err);
    //    else
    //    console.log(result);

        User.findOne({username:user.username,password:user.password},function(err,foundUser){
            //console.log(err);
            console.log("USer found");
            console.log(foundUser);
            res.json(foundUser);


        });
        
    //})



});

app.post("/rest/register",function(req,res)
		{
	       console.log("inside register");
	         var user=req.body;

	         User.findOne({username:user.username},function(err,existingUser){
	        	 if(existingUser==null)
	        	 {
	        		 User.create(user,function(err,doc)
	    	        		 {
	    	        	        res.json(user);
	    	        		 })
	        	 }
	        	 else
	        		 {
	        		  res.json(null);
	        		 }

	         })


		})


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.listen(port, ip);
app.use(express.static(path.join(__dirname, '/public')));
app.listen(port, ip);