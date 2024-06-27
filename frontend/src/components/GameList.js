import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.61:5000/games')
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  return (
    <List>
      {games.map(game => (
        <ListItem key={game._id}>
          <ListItemText primary={game.title} secondary={game.genre} />
        </ListItem>
      ))}
    </List>
  );
};

export default GameList;
