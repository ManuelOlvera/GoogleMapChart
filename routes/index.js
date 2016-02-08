var express = require('express'),
  router = express.Router(),
  Map = require('../model/map');

/* GET all countries for both me and chau */
router.get('/', function(req, res, next) {
  console.log('login is session req.session.passport', req.session.passport);
  // check if there's a valid session
  if (req.session.passport) {
    console.log('router /'); 
    /* get all the maps (chau's and mine) */
    Map.find({}, function(err, maps) {
      if (err) { throw err; }
      console.log('maps ', maps);
      var joinedMap = []
      maps.forEach(function(elem, index) {
        maps[index].countries.forEach(function(country) {
          joinedMap.push(country);
        });
      });
      var mapData = formatData(maps);
      res.render('index', { map: mapData});
    });
  } else {
    res.redirect('/');
  }
});

/* get all the countries for either chau or myself */
router.get('/:name', function(req, res, next) {
  console.log('router /'); 
  console.log('login is session req.session.passport', req.session.passport);
  // check if there's a valid session
  if (req.session.passport) {
    /* get all the countries for either chau or myself */
    var name = req.params.name;
    console.log('name', name);
    Map.find({ username: name }, function(err, maps) {
      if (err) { throw err; }
      console.log('maps ', maps);
      var mapData = formatData(maps);
      res.render('index', { map: mapData});
    });
  } else {
    res.redirect('/');
  }
});

/* format the data for Google Maps Chart */
function formatData(maps) {
  console.log('formatdata maps', maps);
  var mapData = [['Country', 'Popularity']];
  var isBothMap = maps.length === 2;
  console.log('isBothMap', isBothMap);
  if (maps.length !== 0) {
    var countryObject = {};
    maps.forEach(function(elem, index) {
      maps[index].countries.forEach(function(country) {
        var arr;
        if (isBothMap) {
          if (countryObject[country]) {
            // country visited by both of us
            arr = [country, 500];
          } else {
            arr = [country, index * 1000]; // different colors for each of us
          }
        } else {
          arr = [country, 100];
        }
        countryObject[country] = true;
        console.log('countryObject', countryObject);
        console.log('arr', arr);
        mapData.push(arr);
      });
    });
  }
  return mapData;
}

module.exports = router;