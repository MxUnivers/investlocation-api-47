const Testimonial = require('../models/TestimonialModel');

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    return res.status(201).json({ data: testimonial, message: "Nouveau commentaire envoyer avec succès" });
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ message: "Commentaire non posté" });
  }
};



exports.getAllTestimonials = async (req, res) => {
  try {
    const { startDate, endDate, user, access, userTestimonial } = req.query;

    // Construire dynamiquement les filtres
    let filter = {};

    if (access ) {
      filter.access = access ; // Convertir string "true"/"false" en boolean
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate); // Filtrer par date de début
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate); // Filtrer par date de fin
      }
    }

    if (user) {
      filter.user = user; // Filtrer par utilisateur
    }
    if (userTestimonial) {
      filter.userTestimonial = userTestimonial;
    }

    // Rechercher avec les filtres
    const testimonials = await Testimonial.find(filter).populate('user');

    return res.status(200).json({
      data: testimonials,
      message: "Les témoignages ont été récupérés avec succès.",
    });
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
