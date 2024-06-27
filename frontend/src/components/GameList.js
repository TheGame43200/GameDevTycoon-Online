import React, { useEffect, useState } from 'react';
import { fetchGames, createGame, updateGame, deleteGame } from '../apiService';
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ title: '', genre: '', releaseDate: '' });

  useEffect(() => {
    const loadGames = async () => {
      const games = await fetchGames();
      setGames(games);
    };

    loadGames();
  }, []);

  const handleCreateGame = async () => {
    const createdGame = await createGame(newGame);
    setGames([...games, createdGame]);
    setNewGame({ title: '', genre: '', releaseDate: '' });
  };

  const handleUpdateGame = async (id) => {
    const updatedGame = await updateGame(id, newGame);
    setGames(games.map(game => game._id === id ? updatedGame : game));
    setNewGame({ title: '', genre: '', releaseDate: '' });
  };

  const handleDeleteGame = async (id) => {
    await deleteGame(id);
    setGames(games.filter(game => game._id !== id));
  };

  return (
    <div>
      <h2>Game List</h2>
      <List>
        {games.map(game => (
          <
