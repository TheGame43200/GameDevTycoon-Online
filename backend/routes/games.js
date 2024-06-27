const express = require('express');
const router = express.Router();
const { getAllGames, createGame, updateGame, deleteGame } = require('../controllers/gameController');
const auth = require('../middleware/authMiddleware');

router.get('/', getAllGames);
router.post('/', auth, createGame);  // Authentification requise pour créer un jeu
router.put('/:id', auth, updateGame);  // Authentification requise pour mettre à jour un jeu
router.delete('/:id', auth, deleteGame);  // Authentification requise pour supprimer un jeu

module.exports = router;
