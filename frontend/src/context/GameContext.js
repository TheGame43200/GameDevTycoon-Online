import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <GameContext.Provider value={{ currentGame, setCurrentGame }}>
      {children}
    </GameContext.Provider>
  );
};
