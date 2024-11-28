const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

router.post('/', userController.registerUser);
router.post('/auth/login',authenticateToken, userController.login);
router.post('/update-password/:id',authenticateToken,userController.updatePassworUser);
router.post('/reset-password',authenticateToken,userController.resetPasswordUser);
router.post('/send-code-verify',authenticateToken,userController.sendCodeResetUser);
router.post('/verfiy-code-reset',authenticateToken,userController.verifyCodeUser);
router.put('/edit/:id',authenticateToken, userController.updateUser);
router.patch('/block/:id', authenticateToken, userController.blockUser);
router.get('/get_users',authenticateToken, userController.getAllUsers);
router.get('/get_users/city/:idcity',authenticateToken, userController.getAllUsersByCity);
router.get('/get_clients',authenticateToken, userController.getAllClients);
router.get('/get_user/:id',authenticateToken, userController.getUserById);
router.patch('/statut_user/:userId', userController.toggleUserStatus);

module.exports = router;
