var express = require('express'),
  router = express.Router(),
  User = require('../model/user'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

/* It handles login proccess */
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
/* It handles login proccess */

/* register the user */
router.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  console.log('register req.body', req.body);
  console.log('username', username);
  console.log('password', password);
  console.log('confirmPassword', confirmPassword);

  if(password === confirmPassword) {
    User.find({ username: username }, function(err, user) {
      console.log('searching for user before registering', user);
      console.log('user ', user);
      /* throw error if user exist */
      if (err) { 
        throw err; 
      } else if (user.length > 0) {
        throw 'user is already registered';
      } else {
        user = new User({
          username: username,
          password: password
        });
        user.save(function(err, user) {
          if (err) { throw err; }
          console.log('new user created', user);
          res.redirect('/map');
        });
      }      
    });
  } else {
    res.redirect('/'); 
  }
});


/* log in the user */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/map',
                                   failureRedirect: '/' })
);

router.get('/', function(req, res) {
  console.log('rendering login page');
  console.log('login is session active', req.session);
  if (req.session) {
    // there's an active session. go straight to map
    res.redirect('/map');
  } else {
    res.render('login'); 
  }
});

module.exports = router;