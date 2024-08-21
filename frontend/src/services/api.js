import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getGames = () => axios.get(`${API_URL}/games`);
export const createGame = (gameData) => axios.post(`${API_URL}/games`, gameData);
export const updateGame = (id, gameData) => axios.put(`${API_URL}/games/${id}`, gameData);

// Add more API calls as needed

export default {
  getGames,
  createGame,
  updateGame,
};
