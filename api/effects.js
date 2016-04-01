var express = require('express');
var router = express.Router();

var repo = require('../repository/effectsRepository');

var jsonSchema = {
  "type": "object",
  "title": "Effect",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "id": {
      "title": "Effect ID",
      "type": "string",
      "pattern": "^[a-z0-9\\-]+$"
    },
    "description": {
      "title": "Description",
      "type": "string"
    },
    "type": {
      "title": "Effect Category",
      "type": "string",
      "enum": [
        "boon",
        "condition",
        "status"
      ]
    }
  },
  "required": ["name", "id", "description", "type"]
};

var jsonForm = [
  "name",
  "id", 
  "type",
  {
    key: "description",
    type: "textarea",
    placeholder: "insert a description"
  },
];

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