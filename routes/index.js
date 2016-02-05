var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('router /');
  // console.log('global.db', global.db);
  if (!global.db.mapSchema) {
    global.db.mapSchema = mongoose.Schema({
      name: String,
      countries: [String]
    });
    global.db.Map = mongoose.model('Map', global.db.mapSchema);
  }
  var personMap = 'manuel';
  console.log('personMap', personMap);
  global.db.Map.find({ name: personMap }, function(err, myMap) {
    if (err) { console.error('error find personMap', err); }
    console.log('find personMap myMap', myMap);
    res.render('index', {map: myMap});
  });
});

module.exports = router;
