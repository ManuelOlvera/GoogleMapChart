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
    console.log('find manuel newMap', map);
    var updatedMap = new global.db.Map({
      name: req.body.person,
      countries: req.body.country
    });
    updatedMap.save(function(err, updatedMap) {
      if (err) { console.error(err); }
      console.log('updatedMap', updatedMap);
      res.render('index', {map: updatedMap});
    });
  });
});

module.exports = router;