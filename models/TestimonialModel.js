const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    
    name: { type: String, required: false },
    profession: { type: String, required: false },
    company: { type: String, required: false },
    description: {type:String},
    coverPicture:{type:String}

},{timestamps:true});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);


module.exports = Testimonial;
