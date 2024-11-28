const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les codes postaux
const CodePostalSchema = new Schema({
    indicatif: { // Le code postal ou l'indicatif du pays
        type: String,
        required: false,
        unique: true
    },
    country: { // Le pays correspondant au code postal
        type: String,
        required: false
    },
    description: { // Description optionnelle (ville, région, etc.)
        type: String
    }
},{timestamps:true});

const CodePostal = mongoose.model('CodePostal', CodePostalSchema);


// Liste des codes postaux et indicatifs pour différents pays
const codePostals = [
     { indicatif: '225', country: 'Côte d\'Ivoire', description: 'Code postal Côte d\'Ivoire' },
    { indicatif: '213', country: 'Algérie', description: 'Code postal Algérie' },
    { indicatif: '33', country: 'France', description: 'Code postal France' },
    { indicatif: '1', country: 'États-Unis', description: 'Code postal États-Unis' },
    { indicatif: '44', country: 'Royaume-Uni', description: 'Code postal Royaume-Uni' },
    { indicatif: '81', country: 'Japon', description: 'Code postal Japon' }
];

// Fonction pour vérifier l'existence d'un code postal
async function createCodePostals() {
    for (const codePostal of codePostals) {
        const exists = await CodePostal.findOne({ indicatif: codePostal.indicatif });
        if (!exists) {
            await CodePostal.create(codePostal);
            console.log(`Code postal ${codePostal.indicatif} pour ${codePostal.country} créé.`);
        } else {
            console.log(`Code postal ${codePostal.indicatif} pour ${codePostal.country} existe déjà, pas d'insertion.`);
        }
    }
}

module.exports = {CodePostal , createCodePostals};
