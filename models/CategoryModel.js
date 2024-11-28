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
            coverPicture: "https://example.com/images/tech.jpg"
        },
        {
            name: "Santé et Bien-être",
            description: "Services médicaux, hôpitaux, bien-être mental, et industrie pharmaceutique.",
            coverPicture: "https://example.com/images/health.jpg"
        },
        {
            name: "Éducation et Formation",
            description: "Écoles, universités, cours en ligne, et centres de formation professionnelle.",
            coverPicture: "https://example.com/images/education.jpg"
        },
        {
            name: "Construction et Immobilier",
            description: "Développement immobilier, architecture, construction de bâtiments, et gestion de propriétés.",
            coverPicture: "https://example.com/images/construction.jpg"
        },
        {
            name: "Commerce et Distribution",
            description: "Commerce de détail, gros, e-commerce, et chaînes d'approvisionnement.",
            coverPicture: "https://example.com/images/commerce.jpg"
        },
        {
            name: "Agriculture et Agroalimentaire",
            description: "Production agricole, transformation alimentaire, et distribution de produits alimentaires.",
            coverPicture: "https://example.com/images/agriculture.jpg"
        },
        {
            name: "Finance et Assurance",
            description: "Banques, gestion d'investissements, assurances, et fintech.",
            coverPicture: "https://example.com/images/finance.jpg"
        },
        {
            name: "Énergie et Environnement",
            description: "Production d'énergie, énergies renouvelables, gestion des ressources, et initiatives durables.",
            coverPicture: "https://example.com/images/energy.jpg"
        },
        {
            name: "Transport et Logistique",
            description: "Transport terrestre, maritime et aérien, gestion logistique, et solutions de mobilité.",
            coverPicture: "https://example.com/images/transport.jpg"
        },
        {
            name: "Arts et Divertissement",
            description: "Industrie du cinéma, musique, arts visuels, jeux vidéo, et médias.",
            coverPicture: "https://example.com/images/arts.jpg"
        }
    ];


    categories.forEach(async categoryData => {
        const { name, description, coverPicture } = categoryData;


        // Vérifie si une catégorie avec le même nom existe déjà
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
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
