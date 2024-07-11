// src/routes/zones.js
const router = require('express').Router();
let Zone = require('../models/zone.model');

router.route('/').get((req, res) => {
  Zone.find()
    .then(zones => res.json(zones))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const cameras = req.body.cameras;

  const newZone = new Zone({ name, cameras });

  newZone.save()
    .then(() => res.json('Zone added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
