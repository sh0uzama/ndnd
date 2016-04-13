var express = require('express');
var router = express.Router();

var repo = require('../google-repository/equipmentsRepository');

var jsonSchema = {
  "type": "object",
  "title": "Perk",
  "properties": {
  },
  "required": []
};

var jsonForm = [];

router.get('/', function(req, res) {
  res.json(repo.getAll());
});

router.get('/_meta', function(req, res) {
  res.json({
    schema: jsonSchema,
    form: jsonForm
  });
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