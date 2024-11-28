const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const agendaSchema = new Schema({
    type: { // Type d'agenda: véhicule, propriété, visite
        type: String,
        enum: ['Vehicle', 'Property', 'Visit'],
        required: false
    },
    
    client: { // Client assigné
        type: mongoose.Schema.Types.ObjectId , ref: 'Customer',
        required: false
    },
    startDate: {type:Date}, // Date de début
    endDate: {type:Date}, // Date de fin
    
    priceDays:{ type:Number}, // Prix de l'agenda
    
    
    
},{timestamps:true});

// Middleware pour mettre à jour `updatedAt`
agendaSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports = Agenda;
