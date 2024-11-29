const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: false, unique: true },
    description: { type: String },
    coverPicture: { type: String }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);


const fetchCreatedCategorys = async () => {

    const categories = [
        {
            name: "Informatique et Technologie",
            description: "Développement de logiciels, gestion de données, cybersécurité, et technologies émergentes.",
            coverPicture: "https://img.freepik.com/free-photo/technician-doing-system-analysis-using-tablet-doing-needed-adjustments_482257-88125.jpg?t=st=1732859294~exp=1732862894~hmac=9551b05981e2b23a30fd75fff675b17d2be5a7cda5838c5e97d06fb9ea78d2b2&w=1060"
        },
        {
            name: "Santé et Bien-être",
            description: "Services médicaux, hôpitaux, bien-être mental, et industrie pharmaceutique.",
            coverPicture: "https://img.freepik.com/free-photo/senior-woman-exercising-outdoors-park_23-2150296648.jpg?t=st=1732859367~exp=1732862967~hmac=6ba72493fb00d99f80e1aa6c45bd97248814c5d42ae01ad2067d1c7f6556b2cc&w=900"
        },
        {
            name: "Éducation et Formation",
            description: "Écoles, universités, cours en ligne, et centres de formation professionnelle.",
            coverPicture: "https://img.freepik.com/free-photo/college-students-different-ethnicities-cramming_23-2149891361.jpg?t=st=1732859406~exp=1732863006~hmac=3eb3b8d6fdf0a24efc2ad069599f84270af2eb91ed146e7543fa6f575ab0df87&w=996"
        },
        {
            name: "Construction et Immobilier",
            description: "Développement immobilier, architecture, construction de bâtiments, et gestion de propriétés.",
            coverPicture: "https://img.freepik.com/free-photo/young-black-race-man-with-blueprint-stading-near-glass-building_1157-50906.jpg?t=st=1732860285~exp=1732863885~hmac=9c19dac47af21297bb8c9a3030bae544d39f8b1cb90ecb49e11310d89c3b78e6&w=996"
        },
        {
            name: "Commerce et Distribution",
            description: "Commerce de détail, gros, e-commerce, et chaînes d'approvisionnement.",
            coverPicture: "https://img.freepik.com/free-photo/young-black-race-man-with-blueprint-stading-near-glass-building_1157-50906.jpg?t=st=1732859363~exp=1732862963~hmac=57c0e501eeec0aaa860a323412c43f8e4a8a12bf281b4d33a611f31f78d1baf8&w=996"
        },
        {
            name: "Agriculture et Agroalimentaire",
            description: "Production agricole, transformation alimentaire, et distribution de produits alimentaires.",
            coverPicture: "https://img.freepik.com/free-photo/african-woman-harvesting-vegetables_23-2151441227.jpg?t=st=1732859501~exp=1732863101~hmac=9bb57fdf1b92001c379969fde409876a1a194be4b72f1c72e8607dc9d23f5438&w=1060"
        },
        {
            name: "Finance et Assurance",
            description: "Banques, gestion d'investissements, assurances, et fintech.",
            coverPicture: "https://img.freepik.com/free-photo/person-office-analyzing-checking-finance-graphs_23-2150377127.jpg?t=st=1732859545~exp=1732863145~hmac=5bc1726b0d44276098deabd2b8c45a6e2754c51fafac8e7cccc5d98d1fa22b40&w=996"
        },
        {
            name: "Énergie et Environnement",
            description: "Production d'énergie, énergies renouvelables, gestion des ressources, et initiatives durables.",
            coverPicture: "https://img.freepik.com/free-photo/medium-shot-smiley-engineer-holding-tablet_23-2149354001.jpg?t=st=1732859595~exp=1732863195~hmac=0927177c04babe72a9648e9dc1fd231de11b8f8c2b9c09511009347418caf4dc&w=996"
        },
        {
            name: "Transport et Logistique",
            description: "Transport terrestre, maritime et aérien, gestion logistique, et solutions de mobilité.",
            coverPicture: "https://img.freepik.com/free-photo/logistics-transportation-container-cargo-ship-cargo-plane-with-working-crane-bridge-shipyard-sunrise-logistic-import-export-transport-industry-background-ai-generative_123827-24177.jpg?t=st=1732859636~exp=1732863236~hmac=666de5af49417bfdbeffd8828e7b036b7704ede01b0d233bf1db491439153c84&w=996"
        },
        {
            name: "Arts et Divertissement",
            description: "Industrie du cinéma, musique, arts visuels, jeux vidéo, et médias.",
            coverPicture: "https://img.freepik.com/free-photo/patient-woman-doing-pottery_23-2151709089.jpg?t=st=1732860011~exp=1732863611~hmac=fd3bc047117ba3bfa4c099f5cffb9980c88a951612180941945f3a20fbe5bd9b&w=360"
        }
    ];


    categories.forEach(async categoryData => {
        const { name, description, coverPicture } = categoryData;


        // Vérifie si une catégorie avec le même nom existe déjà
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            existingCategory.coverPicture = coverPicture;
            await existingCategory.save().then(()=>{
                
                // console.log("Image Saveugardé")
            // console.log(coverPicture);
            })
            console.log(`${name} Existe déja`)
        } else {
            // / Crée une nouvelle catégorie
            const newCategory = new Category({
                name,
                description,
                coverPicture,
            });

            await newCategory.save();

            console.log(`${newCategory.name} Créer avec succès`)
        }
    })




};





module.exports = { Category, fetchCreatedCategorys };
