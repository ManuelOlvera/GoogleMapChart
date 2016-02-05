var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.post('/map', function(req, res, next) {
  console.log('post map');
  // console.log('global.db', global.db);
  console.log('req.body', req.body);
  // save the new country in the db
  global.db.Map.find({ name: req.body.person }, function(err, map) {
    if (err) { console.error('error find manuel', err); }
    console.log('find manuel myMap', map);
    // if (map.length === 0) { map.countries = []; map.name = req.body.person; }
    if (map[0]) {
      map[0].countries.push(req.body.country); 
    }
    console.log('find manuel newMap', map);
    var updatedMap = new global.db.Map({
      name: req.body.person,
      countries: map
    });
    updatedMap.update(function(err, updatedMap) {
      if (err) { console.error(err); }
      console.log('updatedMap', updatedMap);
      res.render('index', {map: updatedMap});
    });
  });
  /*var myMap = new global.db.Map({
    name: 'Manuel',
    countries: ['Spain', 'Portugal, France']
  });
  myMap.save(function(err, myMap) {
    if (err) { console.error(err); }
    console.log('myMap', myMap);
  });*/
});

module.exports = router;