// routes/places.js
const express = require('express');
const { getPlaces } = require('../controllers/placesGoogleController');

const router = express.Router();

// Définir la route pour récupérer les lieux
router.get('/', getPlaces);

module.exports = router;

