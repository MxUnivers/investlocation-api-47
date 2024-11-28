const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regionController');
const authenticateToken = require('../middlewares/auth');

router.post('/register', regionsController.createRegion);
router.get('/get_regions', regionsController.getAllCategories);
router.get('/get_regions/:id', regionsController.getRegionById);
router.patch('/edit/:id', regionsController.updateRegion);
router.put('/hide/:id', regionsController.hideRegion);
router.put('/remove/:id', regionsController.restoreRegion);

module.exports = router;
