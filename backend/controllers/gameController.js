const Game = require('../models/Game');

// Obtenir tous les jeux
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau jeu
exports.createGame = async (req, res) => {
  const game = new Game(req.body);
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un jeu
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    Object.assign(game, req.body);
    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un jeu
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    await game.remove();
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
