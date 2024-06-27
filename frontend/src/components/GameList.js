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
          <ListItem key={game._id}>
            <ListItemText primary={game.title} secondary={`${game.genre} - ${game.releaseDate}`} />
            <Button onClick={() => handleUpdateGame(game._id)}>Update</Button>
            <Button onClick={() => handleDeleteGame(game._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <h2>Create New Game</h2>
      <TextField
        label="Title"
        value={newGame.title}
        onChange={e => setNewGame({ ...newGame, title: e.target.value })}
      />
      <TextField
        label="Genre"
        value={newGame.genre}
        onChange={e => setNewGame({ ...newGame, genre: e.target.value })}
      />
      <TextField
        label="Release Date"
        type="date"
        value={newGame.releaseDate}
        onChange={e => setNewGame({ ...newGame, releaseDate: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={handleCreateGame}>Create Game</Button>
    </div>
  );
};

export default GameList;
