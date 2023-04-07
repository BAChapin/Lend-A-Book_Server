const mongoose = require('mongoose');
const slufigy = require('slugify');

const locationSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
