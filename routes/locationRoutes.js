const express = require('express');
const locationController = require('./../controllers/locationController');

const router = express.Router();

router
  .route('/')
  .get(locationController.allLocations)
  .post(locationController.createLocation);

router.route('/:id').get(locationController.oneLocation);

module.exports = router;
