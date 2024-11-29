const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authenticateToken = require('../middlewares/auth');

router.post('/register',authenticateToken, testimonialController.createTestimonial);
router.get('/get_testimonials',authenticateToken, testimonialController.getAllTestimonials);
router.get('/get_testimonial/:id',authenticateToken, testimonialController.getTestimonialById);
router.patch('/edit/:id',authenticateToken, testimonialController.updateTestimonial);
router.put('/hide/:id',authenticateToken, testimonialController.hideTestimonial);
router.put('/remove/:id',authenticateToken, testimonialController.restoreTestimonial);

module.exports = router;
