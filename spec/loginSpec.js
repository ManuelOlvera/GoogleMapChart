var request = require('request');
var googleMapChart = require("../app.js");
var base_url = 'http://localhost:3000/';

describe("Login API", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        //console.log('base_url', base_url);
        //console.log('error', error);
        console.log('response', response.request.uri);
        //console.log('body', body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    // do I need a close server function for testing?
    /*it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        // expect(body).toBe("Hello World");
        // googleMapChart.closeServer();
        done();
      });
    });*/
  });
});