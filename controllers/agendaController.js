
const Agenda = require('../models/AgendaModel');

// Créer un nouvel agenda
exports.createAgenda = async (req, res) => {
    try {
        // Si aucune devise n'est fournie, utiliser DZD par défaut
        let currency = req.body.currency;
        if (!currency) {
            const defaultCurrency = await Currency.findOne({ code: 'DZD' });
            currency = defaultCurrency ? defaultCurrency._id : null;
        }

        const newAgenda = new Agenda({
            ...req.body,
            currency
        });

        const savedAgenda = await newAgenda.save();
        return res.status(201).json(savedAgenda);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'agenda', error });
    }
};

// Mettre à jour un agenda existant
exports.updateAgenda = async (req, res) => {
    try {
        const updatedAgenda = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAgenda) return res.status(404).json({ message: 'Agenda non trouvé' });
        return res.status(200).json(updatedAgenda);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'agenda', error });
    }
};



// recupérer tous les agendas
exports.getAgendaById = async (req, res) => {
    try {
        const agendas = await Agenda.findById({_id: req.params.id});
        return res.status(200).json({data:agendas, message:"Agenda récupérer avec succès"});
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des agendas', error });
    }
};


// Lister tous les agendas
exports.getAllAgendas = async (req, res) => {
    try {
        const agendas = await Agenda.find().populate('client vehicle property currency');
        return res.status(200).json(agendas);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des agendas', error });
    }
};

// Lister les agendas pour un véhicule spécifique
exports.getAgendasByVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const agendas = await Agenda.find({ vehicle: vehicleId }).populate('client vehicle property currency');
        if (!agendas.length) return res.status(404).json({ message: 'Aucun agenda trouvé pour ce véhicule' });
        return res.status(200).json(agendas);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des agendas pour le véhicule', error });
    }
};

// Lister les agendas pour une propriété spécifique
exports.getAgendasByProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const agendas = await Agenda.find({ property: propertyId }).populate('client vehicle property currency');
        if (!agendas.length) return res.status(404).json({ message: 'Aucun agenda trouvé pour cette propriété' });
        return res.status(200).json(agendas);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des agendas pour la propriété', error });
    }
};

// Rechercher les agendas par dates et heures de début et fin
exports.getAgendasByDateRange = async (req, res) => {
    try {
        const { startDate, endDate, startTime, endTime } = req.query;
        const filter = {};

        if (startDate) filter.startDate = { $gte: new Date(startDate) };
        if (endDate) filter.endDate = { $lte: new Date(endDate) };
        if (startTime) filter.startTime = startTime;
        if (endTime) filter.endTime = endTime;

        const agendas = await Agenda.find(filter).populate('client vehicle property currency');
        if (!agendas.length) return res.status(404).json({ message: 'Aucun agenda trouvé pour cette période' });
        return res.status(200).json(agendas);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des agendas par date', error });
    }
};

// Supprimer un agenda
exports.deleteAgenda = async (req, res) => {
    try {
        const deletedAgenda = await Agenda.findByIdAndDelete(req.params.id);
        if (!deletedAgenda) return res.status(404).json({ message: 'Agenda non trouvé' });
        return res.status(200).json({ message: 'Agenda supprimé avec succès' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'agenda', error });
    }
};
