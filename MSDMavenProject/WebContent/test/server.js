var expect  = require("chai").expect;
var request = require("request");
var superagentRequest = require("superagent");

var url = "http://localhost:3000";

describe("Test Server Code :",function(){

	describe("Hit the login and register url directly :",function(){

		it("Login Url should return Cannot GET response", function(done){
			request(url+"/rest/login", function(error, response, body){
				expect(body).to.equal("Cannot GET /rest/login\n");
				done();
			});
		});

		it("Registration Url should return Cannot GET response", function(done){
			request(url+"/rest/register", function(error, response, body){
				expect(body).to.equal("Cannot GET /rest/register\n");
				done();
			});
		});

	});

	describe("Connection to MongoDb is present :",function(){
		
		it("User should be able to login when he is registered", function(done){

			superagentRequest.post(url + "/rest/login")
			.send({username:"kevin",
				password:"kevin"}).end(function(error, response, body){
					expect(response.body.username).to.equal("kevin");
					done();
				});
			});

		it("User should not be able to login when he has given the wrong username", function(done){

			superagentRequest.post(url + "/rest/login")
			.send({username:"asdfads",
				password:"kevin"}).end(function(error, response, body){
					expect(response.body).to.be.empty;
					done();
				});
			});

		it("User should not be able to login when he has given the wrong password", function(done){

			superagentRequest.post(url + "/rest/login")
			.send({username:"kevin",
				password:"asdfasdfsad"}).end(function(error, response, body){
					expect(response.body).to.be.empty;
					done();
				});
			});

		it("User should not be able to login when he has given the wrong username and password", function(done){

			superagentRequest.post(url + "/rest/login")
			.send({username:"kfasasdfadsvin",
				password:"asdfasdfsad"}).end(function(error, response, body){
					expect(response.body).to.be.empty;
					done();
				});
			});

		it("New User should be able to register himself in the system", function(done){

			superagentRequest.post(url + "/rest/register")
			.send({username:"abraham",
				password:"abraham"}).end(function(error, response, body){
					expect(response.body.username).to.equal("abraham");
					done();
				});
			});

		it("Existing user should not be able to register himself in the system with the same username", function(done){

			superagentRequest.post(url + "/rest/register")
			.send({username:"abraham",
				password:"abraham"}).end(function(error, response, body){
					expect(response.body).to.be.null;
					done();
				});
			});

	});

});	



