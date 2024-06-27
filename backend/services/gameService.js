const Game = require('../models/Game');

exports.getAllGames = async () => {
  return await Game.find();
};

exports.createGame = async (gameData) => {
  const game = new Game(gameData);
  return await game.save();
};

exports.updateGame = async (id, gameData) => {
  const game = await Game.findById(id);
  if (!game) throw new Error('Game not found');
  Object.assign(game, gameData);
  return await game.save();
};

exports.deleteGame = async (id) => {
  const game = await Game.findById(id);
  if (!game) throw new Error('Game not found');
  return await game.remove();
};
