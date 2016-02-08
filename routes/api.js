var express = require('express'),
  router = express.Router(),
  Map = require('../model/map');

/* post new country */
router.post('/map', function(req, res, next) {
  console.log('post map');
  console.log('req.body ', req.body);
  var person = req.body.person,
    country = req.body.country;
  console.log('person ', person);
  console.log('country ', country);
  
  /* get all the maps (chau's and mine) */
  Map.find({ username: person }, function(err, map) {
    if (err) { throw err; }    
    console.log('map ', map);
    
    var existingCountry = false;
    /* first country */
    if (map.length === 0) { 
      console.log('first country');
      map = new Map({
        username: person,
        countries: [country]
      });
      saveNewCountry(map, res);
    } else {
      console.log('not the first country');
      /* check if the country was previously inserted */
      map = map[0];
      map.countries.forEach(function(countryName) {
        console.log(countryName.toLowerCase() === country.toLowerCase());
        console.log('countryName.toLowerCase()', countryName.toLowerCase());
        existingCountry = existingCountry || countryName.toLowerCase() === country.toLowerCase();
      });
      
      if (!existingCountry) {
        console.log('new country');
        map.countries.push(country);
        saveNewCountry(map, res);
      } else {
        console.log('mot a new country');
        res.redirect('/');
      }
    }  
        
  });
});

function saveNewCountry (map, res) {
  console.log('map ', map);
  /* saves the new country */
  map.save(function(err, map) {
    if (err) { throw err; }
    console.log('new country added', map);
    res.redirect('/');
  });
}
module.exports = router;