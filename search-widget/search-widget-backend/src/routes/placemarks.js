const router = require('express').Router();
let Placemark = require('../models/placemark.model');

router.route('/').get((req, res) => {
  Placemark.find()
    .then(placemarks => res.json(placemarks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const subtypes = req.body.subtypes;

  const newPlacemark = new Placemark({ name, subtypes });

  newPlacemark.save()
    .then(() => res.json('Placemark added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
