var express = require('express'),
  router = express.Router(),
  Map = require('../model/map');

router.delete('/map', function(req, res, next) {
  console.log('delete country');
  console.log('req.body ', req.body);
  var person = req.body.person,
    country = req.body.country;
  console.log('person ', person);
  console.log('country ', country);
  Map.find({ username: person }, function(err, map) {
    if (err) { throw err; }    
    console.log('map ', map);
    // removes the selected country from the country array
    map[0].countries.splice(map[0].countries.indexOf(country), 1);
    console.log('new map', map[0].countries);
    map[0].save(function(err, map) {
    if (err) { throw err; }
      console.log('country removed', map);
      // res.redirect('/map');
      res.end();
    });
  });
});

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
        existingCountry = existingCountry || countryName === country;
      });
      
      if (!existingCountry) {
        console.log('new country');
        map.countries.push(country);
        saveNewCountry(map, res);
      } else {
        console.log('mot a new country');
        // res.redirect('/map');
        res.end();
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
    // res.redirect('/map');
    res.end();
  });
}
module.exports = router;