const { check, validationResult } = require('express-validator');
const Game = require('../models/Game');
const gameService = require('../services/gameService');

// Validation et création d'un jeu
exports.createGame = [
  // Validation des champs
  check('title').isString().notEmpty().withMessage('Title is required and must be a string.'),
  check('genre').isString().notEmpty().withMessage('Genre is required and must be a string.'),
  check('releaseDate').isISO8601().toDate().withMessage('Release date must be a valid date.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newGame = await gameService.createGame(req.body);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

// Obtenir tous les jeux
exports.getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un jeu
exports.updateGame = async (req, res) => {
  try {
    const updatedGame = await gameService.updateGame(req.params.id, req.body);
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un jeu
exports.deleteGame = async (req, res) => {
  try {
    await gameService.deleteGame(req.params.id);
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
