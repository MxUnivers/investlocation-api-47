const mongoose = require('mongoose');
const { Currency } = require('./PaymentModel');
const Schema = mongoose.Schema;



const reviewSchema = new Schema({
    user: { // Type d'agenda: véhicule, propriété, visite
        type: String,
        enum: ['Vehicle', 'Property', 'Visit'],
        required: false
    },
    content:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }, // Création
    updatedAt: { type: Date, default: Date.now } // Mise à jour
},{timestamps:true});

// Middleware pour mettre à jour `updatedAt`
agendaSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
