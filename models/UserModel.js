const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        // Informations personnelles
        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        companyName: { type: String, required: false },

        // Coordonnées de contact
        email: { type: String, required: false },
        phone: { type: String, required: false },
        description:{type:String, required:false},

        // Informations d'adresse
        codePostal: { type: mongoose.Schema.Types.ObjectId, ref: 'CodePostal', required: false },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
        region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: false },
        
        address: { type: String, required: false },
        addressPostal: { type: String, required: false },
        companyAddress: { type: String },

        images:[{type:String}],

        // Informations professionnelles
        profession: { type: String, required: false },
        description: { type: String, required: false },

        // Image de profil
        profilePicture: { type: String },

        // Données de localisation
        lat: { type: Number },
        lng: { type: Number },

        // Planning
        schedule: { type: Object },

        // Sécurité
        password: { type: String, required: false },
        passwordverifield: { type: String, required: false },

        // Statut utilisateur
        status: { type: String, enum: ['Active', 'Blocked'], default: 'Blocked' },

        // Autres informations
        conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'conversations' }],
        rating: { type: Number, default: 1 },
        online: { type: Boolean, default: false },
        lastSeen: { type: Date, default: Date.now },
    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
