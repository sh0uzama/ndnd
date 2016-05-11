var express = require('express');
var Hero = require('../model/hero');

var router = express.Router();

router.get('/', function(req, res) {

  console.log('fetching heroes for user:', req.user._id);

  Hero.find({

    userId: req.user._id

  }, function(err, heroes) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.status(200).json(heroes);

  });

});

router.get('/:id', function(req, res) {

  console.log('fetching hero:', req.params.id, 'for user:', req.user._id);

  Hero.findById(req.params.id, function(err, hero) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    if (!hero) {
      return res.status(404).end();
    }

    if (String(hero.userId) != String(req.user._id)) {
      return res.status(403).end();
    }

    res.status(200).json(hero);

  });

});

router.post('/', function(req, res) {

  console.log('creating hero for user:', req.user._id);

  var hero = new Hero(req.body);
  hero.userId = req.user._id;

  hero.save(function(err) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.status(200).json(hero);

  });
});

router.put('/:id', function(req, res) {

  console.log('updating hero:', req.params.id, 'for user:', req.user._id);

  var updatedModel = req.body;
  delete updatedModel._id;

  var query = {
    _id: req.params.id,
    userId: req.user._id
  };

  Hero.findOneAndUpdate(query, updatedModel, function(err, hero) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    if (!hero) {
      return res.status(404).end();
    }

    res.status(200).json(hero);

  });

});

router.delete('/:id', function(req, res) {

  console.log('deleting hero:', req.params.id, 'for user:', req.user._id);

  var query = {
    _id: req.params.id,
    userId: req.user._id
  };
  
  Hero.findOneAndRemove(query, function(err, hero) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    if (!hero) {
      return res.status(404).end();
    }

    res.status(200).json(hero);

  });

});

module.exports = router;