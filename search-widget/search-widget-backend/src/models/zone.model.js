// src/models/zone.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const zoneSchema = new Schema({
  name: { type: String, required: true },
  cameras: [
    {
      name: String,
      connection: String,
    },
  ],
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
