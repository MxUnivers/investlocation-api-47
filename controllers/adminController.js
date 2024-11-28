// controllers/adminController.js
const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt =  require("jsonwebtoken");
const dotenv =  require("dotenv").config();

// Create a new administrator
exports.createAdmin = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    try {
        const userExist = await User.findOne({ email: email });
        const customerExist = await Customer.findOne({ email: email });
        const adminExist = await User.findOne({ email: email });
        if (userExist || customerExist) {
            return res.status(400).json({ message: "Cet email est déja utilisé pas un utilisateur de la plateforme" })
        }
        if (customerExist) {
            return res.status(400).json({ message: "Cet email est déja utilisé pas un client de la plateforme" })
        }
        if (adminExist) {
            return res.status(400).json({ message: "Cet email est déja utilisé pas autre administrateur" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ firstname, lastname, email, password: hashedPassword, role });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Block or unblock an administrator
exports.toggleAdminStatus = async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.findById({ _id: adminId });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        admin.status = admin.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
        await admin.save();
        var message = "";
        if (admin.status === "ACTIVE") {
            message = "Compte débloquer avec succès"
        }
        else if (admin.status === "BLOCKED") {
            message = "Compte bloqué avec succès"
        }
        return res.status(200).json({ data: admin, message: message });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete an administrator
exports.deleteAdmin = async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.findByIdAndDelete(adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        return res.status(200).json({ data: admin, message: 'Admin deleted successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Adminstrateur non supprimé" });
    }
};




// Recupérer tous les adminstrateur
exports.getAdmins = async (req, res) => {
    try {
        const admin = await Admin.find({});

        return res.status(200).json({ data: admin.reverse(), message: 'Adminstrateur de la plateforme en question' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Adminstrateur non supprimé" });
    }
};


// Recupérer tous les adminstrateur
exports.getAdminById = async (req, res) => {
    try {
        const idAdmin = req.params.id;
        const admin = await Admin.findById({ _id: idAdmin });

        return res.status(200).json({ data: admin, message: 'Administrateur récupérer avec succès' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Adminstrateur nonrécupérer" });
    }
};



// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin || admin.status === 'BLOCKED') {
            return res.status(401).json({ message: 'Compte adminstrateur bloqué' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrecte' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token, data:admin });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Connexion impossible" });
    }
};