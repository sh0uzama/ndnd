var express = require('express');
var Sheet = require('../model/sheet');

var router = express.Router();

// ALL SHEET BY USER
router.get('/', function(req, res) {

  console.log('fetching sheets for user:', req.user._id);

  Sheet.find({
    userId: req.user._id
  }, function(err, sheets) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.status(200).json(sheets);

  });

});

// ALL SHEET BY USER AND HERO
router.get('/hero/:id', function(req, res) {

  console.log('fetching sheets for user:', req.user._id, 'and hero:', req.params.id);

  Sheet.find({
    userId: req.user._id,
    heroId: req.params.id
  }, function(err, sheets) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.status(200).json(sheets);

  });

});

router.get('/:id', function(req, res) {

  console.log('fetching sheet:', req.params.id, 'for user:', req.user._id);

  Sheet.findById(req.params.id, function(err, sheet) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    if (!sheet) {
      return res.status(404).end();
    }

    if (String(sheet.userId) != String(req.user._id)) {
      return res.status(403).end();
    }

    res.status(200).json(sheet);

  });

});

router.post('/', function(req, res) {

  console.log('creating sheet for user:', req.user._id);

  var sheet = new Sheet(req.body);
  sheet.userId = req.user._id;

  sheet.save(function(err) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.status(200).json(sheet);

  });
});

router.put('/:id', function(req, res) {

  console.log('updating sheet:', req.params.id, 'for user:', req.user._id);

  var updatedModel = req.body;
  delete updatedModel._id;

  var query = {
    _id: req.params.id,
    userId: req.user._id
  };

  Sheet.findOneAndUpdate(query, updatedModel, function(err, sheet) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    if (!sheet) {
      return res.status(404).end();
    }

    res.status(200).json(sheet);

  });

});

router.delete('/:id', function(req, res) {

  console.log('deleting sheet:', req.params.id, 'for user:', req.user._id);

  var query = {
    _id: req.params.id,
    userId: req.user._id
  };
  
  Sheet.findOneAndRemove(query, function(err, sheet) {

    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    if (!sheet) {
      return res.status(404).end();
    }

    res.status(200).json(sheet);

  });

});

module.exports = router;