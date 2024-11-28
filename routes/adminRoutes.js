// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/auth');

// Route to create an admin
router.post('/',authenticateToken, adminController.createAdmin);
// Route to block/unblock an admin
router.patch('/update/:adminId/status',authenticateToken, adminController.toggleAdminStatus);
// Route
router.patch('/get_admins',authenticateToken, adminController.getAdmins);
// Route
router.patch('/get_admin/:id',authenticateToken, adminController.getAdminById);
// Route to delete an admin
router.delete('/delete/:adminId',authenticateToken, adminController.deleteAdmin);
// login connexion
router.post('/login',authenticateToken, adminController.loginAdmin);



module.exports = router;
