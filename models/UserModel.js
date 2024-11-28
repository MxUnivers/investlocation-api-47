const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    firstname: {type: String,  required: false },
    lastname: {type: String,  required: false },
    companyName:{type:String,required:false},
    email: {type: String,  required: false }, 
    phone: {type: String,  required: false},
    codePostal: { type: mongoose.Schema.Types.ObjectId , ref: 'CodePostal' , required: false },
    gender: {type: Object,default: 'Male'},
    dateOfBirth: {type: String,required: false},
    profilePicture: {type: String},
    profession: {type: String,required: false},
    address: { type: String,required: false},
    addressPostal: {type: String,required: false},
    contactName:{type:String},
    companyAddress:{type:String},
    //, enum: ['INDIVIDUAL', 'COMPANY', "ADMIN", "SUPER_ADMIN"]
    description: { type: String , required: false},
    password: { type: String , required: false},
    passwordverifield: { type: String , required: false},
    services: { type: [Object ],required: false},
    rating: { type: Number , default: 1},
    availability: { type: String, enum: ['AVAILABLE', 'BUSY', 'UNAVAILABLE'], default: 'AVAILABLE' },
    location:{type:String},
    // emplacement
    country: { type: Object, default: { value: "Algerie", label: "Algerie"} },
    language: { type: Object, default: { value: "fr", label: "Français" } },
    status:{ type:String , enum:["Active","Blocked"] , default:"Blocked" },
    // solde
    // chat
    conversations: [{ type: mongoose.Schema.Types.ObjectId , ref: 'conversations' }],
    online: { type: Boolean, default: false },
    lastSeen: { type: Date , default: Date.now }

}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
