
const express = require('express');
const router = express.Router();
const codepostalController = require('../controllers/codepostalController');
const authenticateToken = require('../middlewares/auth');

router.get('/get_codepostals' ,  codepostalController.getAllCodePostals); // Lister tous les accessoires


module.exports = router;
