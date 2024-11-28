const Publication = require('../models/PublicationModel');

exports.createPublication = async (req, res) => {
  try {
    const publication = new Publication(req.body);
    await publication.save();
    return res.status(201).json({ data: publication, message: "Nouvelle publication créée avec succès" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    return res.status(200).json({ data: publications, message: "Toutes les publications récupérées avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    return res.status(200).json({ data: publication, message: "Catégorie récupérée avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publication) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    return res.status(200).json({ data: publication, message: "Catégorie mise à jour avec succès" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.hidePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, { access: false }, { new: true });
    if (!publication) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    return res.status(200).json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.restorePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, { access: true }, { new: true });
    if (!publication) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    return res.status(200).json({ message: 'Catégorie restaurée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
