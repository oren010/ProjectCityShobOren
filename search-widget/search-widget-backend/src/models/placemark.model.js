const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placemarkSchema = new Schema({
  name: { type: String, required: true },
  subtypes: [
    {
      name: String,
    },
  ],
});

const Placemark = mongoose.model('Placemark', placemarkSchema);

module.exports = Placemark;
