#!/bin/bash

# Créer le dossier backend s'il n'existe pas
mkdir -p backend

# Se déplacer dans le dossier backend
cd backend

# Créer la structure des dossiers
mkdir -p src/{controllers,models,routes,services,middleware,utils,config}

# ... le reste du script reste inchangé

# Contenu de app.js
cat > src/app.js << EOL
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const companyRoutes = require('./routes/companyRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/market', marketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# Contenu des contrôleurs
cat > src/controllers/userController.js << EOL
exports.createUser = async (req, res) => {
  // Implémentation à venir
};

exports.getUser = async (req, res) => {
  // Implémentation à venir
};

exports.updateUser = async (req, res) => {
  // Implémentation à venir
};
EOL

cat > src/controllers/gameController.js << EOL
exports.createGame = async (req, res) => {
  // Implémentation à venir
};

exports.getGame = async (req, res) => {
  // Implémentation à venir
};

exports.updateGame = async (req, res) => {
  // Implémentation à venir
};
EOL

cat > src/controllers/employeeController.js << EOL
exports.hireEmployee = async (req, res) => {
  // Implémentation à venir
};

exports.fireEmployee = async (req, res) => {
  // Implémentation à venir
};

exports.updateEmployee = async (req, res) => {
  // Implémentation à venir
};
EOL

cat > src/controllers/companyController.js << EOL
exports.createCompany = async (req, res) => {
  // Implémentation à venir
};

exports.getCompany = async (req, res) => {
  // Implémentation à venir
};

exports.updateCompany = async (req, res) => {
  // Implémentation à venir
};
EOL

cat > src/controllers/marketController.js << EOL
exports.listEmployees = async (req, res) => {
  // Implémentation à venir
};

exports.buyEmployee = async (req, res) => {
  // Implémentation à venir
};

exports.sellEmployee = async (req, res) => {
  // Implémentation à venir
};
EOL

# Contenu des modèles
cat > src/models/User.js << EOL
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('User', userSchema);
EOL

cat > src/models/Game.js << EOL
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  developmentStage: { type: String, enum: ['concept', 'development', 'testing', 'release'], default: 'concept' },
  rating: { type: Number, min: 0, max: 10 },
  sales: { type: Number, default: 0 }
});

module.exports = mongoose.model('Game', gameSchema);
EOL

cat > src/models/Employee.js << EOL
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: {
    programming: { type: Number, min: 1, max: 100 },
    design: { type: Number, min: 1, max: 100 },
    marketing: { type: Number, min: 1, max: 100 }
  },
  salary: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Employee', employeeSchema);
EOL

cat > src/models/Company.js << EOL
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  funds: { type: Number, default: 10000 },
  reputation: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Company', companySchema);
EOL

# Contenu des routes
cat > src/routes/userRoutes.js << EOL
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);

module.exports = router;
EOL

cat > src/routes/gameRoutes.js << EOL
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/', gameController.createGame);
router.get('/:id', gameController.getGame);
router.put('/:id', gameController.updateGame);

module.exports = router;
EOL

cat > src/routes/employeeRoutes.js << EOL
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/hire', employeeController.hireEmployee);
router.delete('/:id', employeeController.fireEmployee);
router.put('/:id', employeeController.updateEmployee);

module.exports = router;
EOL

cat > src/routes/companyRoutes.js << EOL
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompany);
router.put('/:id', companyController.updateCompany);

module.exports = router;
EOL

cat > src/routes/marketRoutes.js << EOL
const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/employees', marketController.listEmployees);
router.post('/buy', marketController.buyEmployee);
router.post('/sell', marketController.sellEmployee);

module.exports = router;
EOL

# Contenu des services
cat > src/services/gameLogicService.js << EOL
exports.calculateGameSuccess = (game, company) => {
  // Implémentation de la logique de succès du jeu
};

exports.generateRevenue = (game) => {
  // Implémentation de la génération de revenus
};
EOL

cat > src/services/marketService.js << EOL
exports.generateMarketEmployees = () => {
  // Implémentation de la génération d'employés pour le marché
};

exports.calculateEmployeeValue = (employee) => {
  // Implémentation du calcul de la valeur d'un employé
};
EOL

cat > src/services/socketService.js << EOL
const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};
EOL

# Contenu du middleware
cat > src/middleware/auth.js << EOL
module.exports = (req, res, next) => {
  // Implémentation de l'authentification
  next();
};
EOL

# Contenu des utilitaires
cat > src/utils/helpers.js << EOL
exports.generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
EOL

# Contenu de la configuration
cat > src/config/database.js << EOL
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
EOL

# Mise à jour du package.json
cat > package.json << EOL
{
  "name": "game-dev-tycoon-backend",
  "version": "1.0.0",
  "description": "Backend for Game Dev Tycoon Online",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.12.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "socket.io": "^4.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
EOL

# Création du fichier .env
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gamedevtycoon
NODE_ENV=development
EOL

echo "Backend structure and files have been updated."
