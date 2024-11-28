const Testimonial = require('../models/TestimonialModel');

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    return res.status(201).json({ data: testimonial, message: "Nouveau témoignage créée avec succès" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    return res.status(200).json({ data: testimonials, message: "Toutes les témoignages récupérées avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Témoignages non trouvée" });
    }
    return res.status(200).json({ data: testimonial, message: "Témoignages récupérée avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) {
      return res.status(404).json({ message: "Témoignages non trouvée" });
    }
    return res.status(200).json({ data: testimonial, message: "Témoignage mise à jour avec succès" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.hideTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { access: false }, { new: true });
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvée' });
    }
    return res.status(200).json({ message: 'Témoignage supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.restoreTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { access: true }, { new: true });
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvée' });
    }
    return res.status(200).json({ message: 'Témoignage restaurée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
