const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController'); // Importer le contrôleur
const authenticateToken = require('../middlewares/auth');

// Créer un nouvel agenda
router.post('/', agendaController.createAgenda);

// Lister tous les agendas
router.get('/get_agendas', agendaController.getAllAgendas);

// Récupérer un agenda par ID
router.get('/get_agenda/:id', agendaController.getAgendaById);

// Mettre à jour un agenda
router.put('/update/:id',authenticateToken, agendaController.updateAgenda);

// Supprimer un agenda
router.delete('/delete/:id',authenticateToken, agendaController.deleteAgenda);

// Lister les agendas pour un véhicule spécifique
router.get('/get_agendas/vehicle/:vehicleId',authenticateToken, agendaController.getAgendasByVehicle);

// Lister les agendas pour une propriété spécifique
router.get('/get_agendas/property/:propertyId',authenticateToken, agendaController.getAgendasByProperty);

// Rechercher les agendas par plage de dates et d'heures
router.get('/get_agendas/date-range',authenticateToken, agendaController.getAgendasByDateRange);

module.exports = router;
