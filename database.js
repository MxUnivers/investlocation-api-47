const mongooseClient = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const XLSX = require("xlsx");
const path = require("path");
const { createCodePostals } = require("./models/CodePostalModel");
const Admin = require("./models/AdminModel");

dotenv.config();

const url = process.env.MONGO_URI;

mongooseClient.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongooseClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connexion à la base de données réussie");
  } catch (error) {
    console.error("Connexion à la base de données refusée", error);
    // process.exit(1); // Arrête le processus en cas d'échec
  }
};

// Fonctions d'initialisation



//
async function createAdministrators() {
  const admins = [
    {
      firstname: 'Super',
      lastname: 'Admin',
      email: 'superadmin@example.com',
      password: await bcrypt.hash('SuperAdmin123', 10),
      role: 'SUPER_ADMIN'
    },
    {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: await bcrypt.hash('Admin123', 10),
      role: 'ADMIN'
    },
    {
      firstname: 'Support',
      lastname: 'User',
      email: 'support@example.com',
      password: await bcrypt.hash('Support123', 10),
      role: 'SUPPORT'
    }
  ];

  for (const admin of admins) {
    const exists = await Admin.findOne({ email: admin.email });
    if (!exists) {
      await Admin.create(admin);
      console.log(`Admin ${admin.firstname} ${admin.lastname} créé avec succès.`);
    } else {
      console.log(`L'administrateur ${admin.firstname} ${admin.lastname} existe déjà, pas d'insertion.`);
    }
  }
}








// Fonction principale pour initialiser toutes les données
async function initializeData() {
  try {
    await connectDB();
    await createCodePostals();

    //console.log('Données initialisées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l’initialisation des données :', error);
  }
}

initializeData();

module.exports = connectDB;
