
const { CodePostal } = require('../models/CodePostalModel');

// Lister tous les accessoires
exports.getAllCodePostals = async (req, res) => {
    try {
        const codepostals = await CodePostal.find();
        return res.status(200).json({data:codepostals});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};