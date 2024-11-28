const Notification = require('../models/NotificationModel');



// Fonction pour récupérer une notification spécifique par ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate('user')
            

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification non trouvée' });
        }

        // Envoyer la notification trouvée
        return res.status(200).json({ success: true, data: notification });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération de la notification', error: error.message });
    }
};




// Fonction pour récupérer toutes les notifications avec des filtres optionnels
exports.getAllNotifications = async (req, res) => {
    try {
        const filters = {};

        // Ajout de filtres optionnels selon les paramètres fournis
        if (req.query.user) {
            filters.user = req.query.user;
        }
        

        // Filtrer par créneau de dates pour createdAt (date de création)
        if (req.query.startDate && req.query.endDate) {
            filters.createdAt = {
                $gte: new Date(req.query.startDate), // Date de début
                $lte: new Date(req.query.endDate)    // Date de fin
            };
        }

        // Récupérer les notifications avec les filtres fournis
        const notifications = await Notification.find(filters)
            .populate('user')            

        // Envoyer les notifications récupérées
        return res.status(200).json({
            success: true,
            data: notifications.reverse(), message:"Notificaiton récupérer avec succès"
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des notifications', error: error.message });
    }
};
