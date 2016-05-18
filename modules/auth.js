var express = require('express');
var router = express.Router();
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;

var User = require("../model/user");

var localStrat = new LocalStrategy(

  function(username, password, done) {

    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });

  }

);

var googleStrat = new GoogleStrategy(
  require('../google.config'),
  function(accessToken, refreshToken, profile, done) {

    User.findOne({
      googleId: profile.id
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      else {
        user = new User();
        user.username = profile.displayName;
        user.displayname = profile.displayName;
        user.googleId = profile.id;
        if (profile.photos[0]) {
          user.avatar = profile.photos[0].value;
        }
        user.save(function(err) {
          if (err) {
            console.log(err, user);
            throw err;
          }
          return done(null, user);
        });
      }
    });
  }
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, function(err, user) {
    done(err, user);
  });
});

passport.use(localStrat);
passport.use(googleStrat);

var loginSuccessful = function(req, res) {

  res.cookie('ndnd-user', req.user, {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });
  res.redirect('/');

};

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }), loginSuccessful);

router.get('/google',
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
  }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }), loginSuccessful);

router.get('/logout',
  function(req, res) {
    req.logout();
    res.clearCookie('ndnd-user');
    res.redirect('/login');
  });

module.exports = router;