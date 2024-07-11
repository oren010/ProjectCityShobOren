const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const layerSchema = new Schema({
  name: { type: String, required: true },
  subtypes: [
    {
      name: String,
    },
  ],
});

const Layer = mongoose.model('Layer', layerSchema);

module.exports = Layer;
