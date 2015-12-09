var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var path = require("path");

var mongoose=require('mongoose');

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");
var session = require("express-session");



var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/User';

var db = mongoose.connect(connectionString);

var UserSchema=new mongoose.Schema({
    firstname: String,
    lastname: String,
    username:String,
    password:String,
    email:String,
    preferences : { types :[String], within: Number, pageSize : Number}
})

var User=mongoose.model("User",UserSchema);


//***********************************************
var PrefSchema=new mongoose.Schema({
    username: String,
    eventId: String,
    like: Number,
    dislike: Number
});

var PrefModel = mongoose.model("Pref", PrefSchema);


//**********************************************

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({secret: "this is the secret"}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(function(username,password,done){
    User.findOne({username :username, password:password},function(err,user){
        if(err){
            console.log("Error retrieving user for session");
            return done(err);
        }
        if(!user){
            console.log("No user found in session");
            return done(null,false);}
        return done(null,user);
    });
}));

passport.serializeUser(function(user,done){
done(null,user)
});

passport.deserializeUser(function(user,done){
    User.findOne({username :user.username, password:user.password},function(err,user){
        done(err,user)
    });
});

app.get("/orgs", function (req, res) {

	console.log("helloooooooo from server");
    
    });

app.post("/rest/login", passport.authenticate('local'),function (req, res) {

    var user = req.body;

    console.log("helloooooooo from server");
    console.log(user);

        User.findOne({username:user.username,password:user.password},function(err,foundUser){
            console.log("USer found");
            console.log(foundUser);
            res.json(foundUser);
        });
});

app.post("/rest/updatePref", function (req, res) {
    console.log(">>>>> Update preferences ");
    var user = req.user;
    var p = req.body;  
    User.update({_id: user._id}, {preferences : p},function(err,result){
        if(err)
            res.json(null);
        else{
            User.findOne({_id:user._id},function(err,foundUser){
            res.json(foundUser);
        });
        }
    });
});

app.post("/rest/register",function(req,res){
    console.log("inside register");
     var user=req.body;

     User.findOne({username:user.username},function(err,existingUser){
        if(existingUser==null)
            {
                User.create(user,function(err,doc){
                    passport.authenticate('local')(req, res, function (){
                        res.json(user);
                    });
                    });
            }
            else{ res.json(null);}
        });
});

app.get("/rest/loggedin",function(req,res){
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post("/rest/logout",function(req,res){
    req.logout();
    res.send(200);
});

app.post("/rest/like",function(req,res){
    console.log("Inside like");
    var user = req.user;

    var likes = req.body;
    console.log(user);
    console.log(likes);
    PrefModel.update({username: likes.username, eventId: likes.eventId},
        likes,{ upsert: true },function(err,d){
        console.log("Creating");
        console.log(d);
        PrefModel.findOne({username: likes.username, eventId: likes.eventId},function(err,data){
            res.json(data);
        });
        
    });
});

app.post("/rest/dislike",function(req,res){
    console.log("Inside dislike");

    var dislike = req.body;

    console.log(dislike);
    PrefModel.update({username: dislike.username, eventId: dislike.eventId},
        dislike,{ upsert: true },function(err,d){
        console.log("Creating");
        console.log(d);
        PrefModel.findOne({username: dislike.username, eventId: dislike.eventId},function(err,data){
            res.json(data);
        });
        
    });
});

app.get("/rest/pref",function(req,res){
    console.log("Inside pref");
    var user = req.user;
    PrefModel.find({username: user.username},function(err,result){
        res.json(result);
    });
});


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.listen(port, ip);


