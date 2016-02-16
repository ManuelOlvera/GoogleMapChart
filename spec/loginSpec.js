var request = require('request');
var googleMapChart = require("../app.js");
var base_url = 'http://localhost:3000/';

describe("long asynchronous specs", function() {
  
  it('register process test', function(done) {
    request.post({
      url: base_url + 'register',
      json: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'test@test.com', password: '123451', confirmPassword: '12345' })
    }, function(error, response, body) {
      console.log('error', error);
      console.log('body', body);
      expect(response.statusCode).toBe(302);
      done();
    });
  });
  
  it('returns user to login page', function(done) {
    request.get(base_url, function(error, response, body) {
      //console.log('base_url', base_url);
      //console.log('error', error);
      console.log('response', response.request.uri);
      //console.log('body', body);
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('returns user to login page', function(done) {
    request.get(base_url + 'logout', function(error, response, body) {
      //console.log('base_url', base_url);
      //console.log('error', error);
      console.log('response', response.request.uri);
      //console.log('body', body);
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});