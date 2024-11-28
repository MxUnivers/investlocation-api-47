const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les régions avec leurs localités
const regionSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Nom de la région
    localities: [{ type: String, required: true }],      // Liste des localités
}, { timestamps: true });

const Region = mongoose.model('Region', regionSchema);


const regions = [
    {
        name: "Abidjan",
        localities: ["Yopougon", "Cocody", "Treichville", "Marcory", "Plateau", "Abobo", "Koumassi", "Adjame", "Port-Bouet", "Bingerville"]
    },
    {
        name: "Bouaké",
        localities: ["Gonfreville", "N’Gattakro", "Belleville", "Dar-es-Salam", "Djébonoua", "Béoumi", "Kotiessou", "Koko", "Anoumanbo", "Nimbo"]
    },
    {
        name: "San Pedro",
        localities: ["Grand-Béréby", "Tabou", "Sassandra", "Loubou", "Nero-Mer", "Dahoua", "Bardou", "Soubré", "Gagnoa", "Divo"]
    },
    {
        name: "Yamoussoukro",
        localities: ["Kossou", "Attiégouakro", "Zatta", "N’Guessankro", "Kokrenou", "Lolobo", "M’Bahiakro", "Toumodi", "Tiébissou", "Bocanda"]
    },
    {
        name: "Korhogo",
        localities: ["Sinématiali", "Ferkessédougou", "Dikodougou", "Léraba", "Napié", "Kong", "Tengréla", "Boundiali", "Karakoro", "Nafana"]
    },
    {
        name: "Daloa",
        localities: ["Vavoua", "Issia", "Zoukougbeu", "Bonon", "Saïoua", "Hiré", "Zuénoula", "Guitry", "Boguédia", "Oumé"]
    },
    {
        name: "Touba",
        localities: ["Guintéguéla", "Ouaninou", "Séguéla", "Madinani", "Bako", "Komborodougou", "Koro", "Dioulabougou", "Gbelo", "Foungbesso"]
    },
    {
        name: "Man",
        localities: ["Danané", "Zouan-Hounien", "Bangolo", "Biankouma", "Facobly", "Kouibly", "Gouiné", "Logoualé", "Sipilou", "Bin-Houyé"]
    },
    {
        name: "Gagnoa",
        localities: ["Lakota", "Oumé", "Guibéroua", "Ouragahio", "Sassandra", "Dougroupalégnoa", "Dahiépa-Kéhi", "Bayota", "Béabré", "Guessabo"]
    },
    {
        name: "Bondoukou",
        localities: ["Tanda", "Bouna", "Nassian", "Doropo", "Transua", "Assuéfry", "Sandegué", "Gontougo", "Assueko", "Djakpata"]
    }
];



const addRegions = async () => {
    try {
        for (const region of regions) {
            const existingRegion = await Region.findOne({ name: region.name });

            if (existingRegion) {
                console.log(`La région ${region.name} existe déjà.`);
            } else {
                const newRegion = new Region(region);
                await newRegion.save();
                console.log(`Région ajoutée : ${region.name}`);
            }
        }
    } catch (error) {
        console.error(`Erreur lors de l'ajout des régions : ${error.message}`);
    }
};



module.exports = {Region , addRegions};
