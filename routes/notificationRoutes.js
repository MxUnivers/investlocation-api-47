const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middlewares/auth');

// Route pour récupérer une notification spécifique par son ID
router.get('/get_notification/:id', authenticateToken, notificationController.getNotificationById);

// Route pour récupérer toutes les notifications avec des paramètres facultatifs
router.get('/get_notifications', authenticateToken, notificationController.getAllNotifications);

module.exports = router;
