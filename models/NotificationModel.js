const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    type: { // Type de la notification (réservation, propriété, maintenance, assurance, etc.)
        type: String,
        enum: ['CLIENT',"USER","PUbLICATION"],
        required: false
    },
    user: { // Référence à l'utilisateur qui recevra la notification
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    message: { // Message de la notification
        type: String,
        required: false
    },
    isRead: { // Indique si la notification a été lue
        type: Boolean,
        default: false
    },
    createdAt: { // Date de création de la notification
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
