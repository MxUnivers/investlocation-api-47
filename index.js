const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
dotenv.config();
const connectDB = require('./database');


const app = express();
// const port = process.env.PORT || 1000;
const port = process.env.PORT || 8080;

// middlwares de l'application 
app.use(cors({ origin: "*" }));

const allowedOrigins = [
  'https://investlocation-app.web.app',
  'http://localhost:3000'
];

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    // Si l'origine est dans la liste autorisée ou si elle est absente (par ex. outils comme Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));




app.use(morgan('common'));
app.use(express.json({ limit: "500mb" }));
//app.use(express.urlencoded({ limit: "500mb" }));
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({
  limit: '1000mb',
  extended: true,
}));
app.use(helmet());


// 4. Attaques par déni de service (DoS)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1000, // Limite à 100 requêtes
});
app.use(limiter);



// access control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST ');
  res.setHeader('Authorization', 'Bearer Ax6cicNPg6Xhh5d6Rr285jW3K9Cd2TJ9SvwGQe95H3q94pFZpKaDxS7tnE6k8874rYLf586C74gA3n8p4faWZ9p4h4YrVrNGv4T788Vrqg9F');
  next();
})


const UploadFile = require("./utils/FileUpload");



// Import des routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const codepostalRoutes = require('./routes/codepostalRoutes');
const regionRoutes = require('./routes/regionsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const placeGoogleRoutes = require('./routes/placeGoogleRoutes');

const notificationRoutes = require('./routes/notificationRoutes');

const adminRoutes = require('./routes/adminRoutes');





const authenticateToken = require('./middlewares/auth');
const sendEmail = require('./utils/sendEmail');
const ApplicationInfo = require('./utils/dataApi');
// services artisans


// upload image
app.post("/uploadImage", (req, res) => {
  UploadFile(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});





// Route de test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, "aymarbly559@gmail.com", "Sujet en question", "testemail@gmail.com");
  res.json({ message: "API resaplus availability" });
});





// Utilisation des routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/codepostals', codepostalRoutes);
//
app.use('/api/v1/categorys', categoryRoutes);

app.use('/api/v1/regions', regionRoutes);

app.use('/api/v1/places', placeGoogleRoutes);
//
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admins', adminRoutes);
// Utilisation des routes
app.use('/api/v1/chat', chatRoutes);

// Connectez-vous à MongoDB et démarrez le serveur
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Démarrage du serveur sur le port ${port}`);
  });
}).catch(error => {
  console.error('Impossible de connecter la base de données:', error);
});
