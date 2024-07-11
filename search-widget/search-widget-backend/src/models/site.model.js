const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteSchema = new Schema({
  name: { type: String, required: true },
  subtypes: [
    {
      name: String,
    },
  ],
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
