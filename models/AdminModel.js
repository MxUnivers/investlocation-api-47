// models/adminModel.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'],
        default: 'ADMIN'
    },
    status: { type: String, enum: ['ACTIVE', 'BLOCKED'], default: 'ACTIVE' },
    userAdd: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
