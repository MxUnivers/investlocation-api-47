const { Region } = require("../models/RegionModel");


exports.createRegion = async (req, res) => {
  try {
    const region = new Region(req.body);
    await region.save();
    return res.status(201).json({ data: region, message: "Nouvelle région créée avec succès" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Region.find();
    return res.status(200).json({ data: categories, message: "Toutes les régions récupérées avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) {
      return res.status(404).json({ message: "Région non trouvée" });
    }
    return res.status(200).json({ data: region, message: "Région récupérée avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!region) {
      return res.status(404).json({ message: "Région non trouvée" });
    }
    return res.status(200).json({ data: region, message: "Région mise à jour avec succès" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.hideRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, { access: false }, { new: true });
    if (!region) {
      return res.status(404).json({ message: 'Région non trouvée' });
    }
    return res.status(200).json({ message: 'Région supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.restoreRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, { access: true }, { new: true });
    if (!region) {
      return res.status(404).json({ message: 'Région non trouvée' });
    }
    return res.status(200).json({ message: 'Région restaurée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
