const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    userTestimonial: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    content: { type: String, required: false },
    description: { type: String },
    coverPicture: { type: String },
    access: { type: Boolean, default: true },

}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);


module.exports = Testimonial;
