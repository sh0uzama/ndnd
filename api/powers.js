var express = require('express');
var router = express.Router();

var repo = require('../repository/powersRepository');

router.get('/', function(req, res) {
  
  res.json(repo.getAll());
  
});

router.get('/:id', function(req, res) {
  
  var result = repo.get(req.params.id);

  if (!result) {
    res.status(404).end();
    return;
  }
  
  res.json(result);
  
});

module.exports = router;