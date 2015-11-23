// to send a request towards web server
var request = require("request");

var base_url = "http://localhost:3000/"

describe("Hello World Server", function() {

	describe("GET /", function() {

		it("returns status code 200", function() {
			request.get(base_url, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				// callback to synchronize it() with its expect(). Otherwise
				// it() may finish before expect().
				done();
			});
		});

		it("returns Hello World", function(done) {
			request.get(base_url, function(error, response, body) {
				expect(body).toBe("Hello World");
				done();
			});
		});

	});

});