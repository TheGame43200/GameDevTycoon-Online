require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/games');
const adminRoutes = require('./routes/adminRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 5000;

// Activer CORS
app.use(cors());

app.use(helmet());

// Configurer le limiteur de taux
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par windowMs
    message: "Trop de requêtes créées à partir de cette IP, veuillez essayer à nouveau après 15 minutes"
});
app.use(limiter);

// URI de connexion MongoDB
const mongoUri = process.env.MONGO_URI;

// Connexion à MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté...'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Middleware
app.use(express.json());

// Utiliser les routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

// Point de terminaison de test
app.get('/api/test', (req, res) => {
    res.send('Hello World from Backend!');
});

// Route par défaut pour gérer les requêtes non correspondantes
app.get('*', (req, res) => {
    res.status(404).send('Route non trouvée');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});
