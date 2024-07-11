const router = require('express').Router();
let Layer = require('../models/layer.model');

router.route('/').get((req, res) => {
  Layer.find()
    .then(layers => res.json(layers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const subtypes = req.body.subtypes;

  const newLayer = new Layer({ name, subtypes });

  newLayer.save()
    .then(() => res.json('Layer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
