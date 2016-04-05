var express = require('express');
var router = express.Router();

var repo = require('../google-repository/powersRepository');

var jsonSchema = {
  "type": "object",
  "title": "Power",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "id": {
      "title": "Power ID",
      "type": "string",
      "pattern": "^[a-z0-9\\-]+$"
    },
    "effect": {
      "title": "Description",
      "type": "string"
    },
    "action": {
      "title": "Action Type",
      "type": "string",
      "enum": [
        "Standard",
        "Quick",
        "Quick (Trigger)"
      ]
    },
    "energy": {
      "title": "Energy",
      "type": "integer"
    },
    "upkeep": {
      "title": "Upkeep",
      "type": "integer"
    },
    "requirements": {
      "title": "Requirements",
      "type": "string"
    },
    "source": {
      "title": "Source",
      "type": "string",
      "enum": [
        "elemental-magic",
        "arms",
        "shadow-arts"
      ]
    }
  },
  "required": ["name", "id", "effect", "action", "source"]
};

var jsonForm = [
  "id",
  "name", {
    key: "requirements",
    type: "textarea",
    placeholder: "power requirements"
  }, {
    key: "effect",
    type: "textarea",
    placeholder: "power effect(s)"
  },
  "action",
  "energy",
  "upkeep",
  "source"
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