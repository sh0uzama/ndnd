var express = require('express');
var Hero = require('../model/hero');

var router = express.Router();

router.get('/', function(req, res) {

  Hero.find({

    userId: req.user._id

  }, function(err, heroes) {

    if (err) {
      return console.error(err);
    }

    res.json(heroes);

  });

});

router.get('/:id', function(req, res) {
  
  Hero.findById(req.params.id, function (err, hero) {
    
    if (err) {
      return console.error(err);
    }
    
    res.json(hero);
    
  });
  
});

router.post('/', function(req, res) {

  var hero = new Hero(req.body);
  hero.save(function(err) {

    if (err) {
      return console.error(err);
    }

    res.json(hero);
    
  });
});

router.put('/:id', function(req,res) {
  
  var updatedModel = req.body;
  delete updatedModel._id;
  
  Hero.findByIdAndUpdate(req.params.id, updatedModel, function(err, hero) {

    if (err) {
      return console.error(err);
    }

    res.json(hero);
    
  });
  
});

router.delete('/:id', function(req,res) {
  
  Hero.findByIdAndRemove(req.params.id, function(err, hero) {

    if (err) {
      return console.error(err);
    }

    res.json(hero);
    
  });
  
});

module.exports = router;