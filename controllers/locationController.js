const Location = require('./../models/locationModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('../utils/appError');

// Middleware

// Route Handlers
// '/api/v1/locations'
exports.allLocations = catchAsync(async (req, res, next) => {
  const { lat, long, radius } = req.query;
  const locations = await Location.find({
    location: {
      $near: {
        $maxDistance: radius * 1000,
        $geometry: {
          type: 'Point',
          coordinates: [lat * 1, long * 1],
        },
      },
    },
  });

  res.status(200).json({
    status: 'success',
    results: locations.length,
    data: {
      locations,
    },
  });
});

exports.createLocation = catchAsync(async (req, res, next) => {
  const newLocation = await Location.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      location: newLocation,
    },
  });
});

// '/api/v1/locations/:id'
exports.oneLocation = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const location = await Location.findById(id);

  if (!location) {
    return next(new AppError(`Location ${id} doesn't exist.`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      location,
    },
  });
});
