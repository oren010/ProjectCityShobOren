const router = require('express').Router();
let Site = require('../models/site.model');

router.route('/').get((req, res) => {
  Site.find()
    .then(sites => res.json(sites))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const subtypes = req.body.subtypes;

  const newSite = new Site({ name, subtypes });

  newSite.save()
    .then(() => res.json('Site added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
