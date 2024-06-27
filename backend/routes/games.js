const express = require('express');
const router = express.Router();
const { getAllGames, createGame, updateGame, deleteGame } = require('../controllers/gameController');

// Routes pour les jeux
router.get('/', getAllGames);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

module.exports = router;
