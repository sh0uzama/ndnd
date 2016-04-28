var express = require('express');
var Hero = require('../model/hero');

var router = express.Router();

router.get('/', function(req, res) {
  
  Hero.find({
    
    userId: req.user._id
    
  }, function(err, heroes) {
    
    if (err)
      return console.error(err);
      
    res.json(heroes);
    
  });
  
});

router.post('/', function(req, res) {
  
  console.log(req);
  
});

module.exports = router;