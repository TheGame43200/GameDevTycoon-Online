#!/bin/bash

# Définir le chemin du dossier frontend
FRONTEND_DIR="$(pwd)/frontend"

# Vérifier si le dossier frontend existe, sinon le créer
if [ ! -d "$FRONTEND_DIR" ]; then
    echo "Le dossier frontend n'existe pas. Création du dossier..."
    mkdir -p "$FRONTEND_DIR"
fi

# Se déplacer dans le dossier frontend
cd "$FRONTEND_DIR"
mkdir -p public
# Créer la structure des dossiers
mkdir -p src/{components/{Office,Market,Leaderboard,Common,Game},pages,services,context,hooks,utils,assets/{images,styles}}

# Contenu de index.html
cat > public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Game Dev Tycoon Online - Manage your game development company" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Game Dev Tycoon Online</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL

# Contenu de App.js
cat > src/App.js << EOL
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GameStudio from './pages/GameStudio';
import Market from './pages/Market';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/studio" component={GameStudio} />
          <Route path="/market" component={Market} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
EOL

# Contenu de index.js
cat > src/index.js << EOL
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
EOL

# Contenu des composants
cat > src/components/Office/Office.js << EOL
import React from 'react';

const Office = () => {
  return (
    <div className="office">
      <h2>Your Game Development Office</h2>
      {/* Add office layout and interactive elements here */}
    </div>
  );
};

export default Office;
EOL

cat > src/components/Market/Market.js << EOL
import React from 'react';

const Market = () => {
  return (
    <div className="market">
      <h2>Employee Market</h2>
      {/* Add market listings and transactions here */}
    </div>
  );
};

export default Market;
EOL

cat > src/components/Leaderboard/Leaderboard.js << EOL
import React from 'react';

const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <h2>Top Game Developers</h2>
      {/* Add leaderboard list here */}
    </div>
  );
};

export default Leaderboard;
EOL

cat > src/components/Game/GameDevelopment.js << EOL
import React from 'react';

const GameDevelopment = () => {
  return (
    <div className="game-development">
      <h2>Develop Your Game</h2>
      {/* Add game development interface here */}
    </div>
  );
};

export default GameDevelopment;
EOL

# Contenu des pages
cat > src/pages/Dashboard.js << EOL
import React from 'react';
import Office from '../components/Office/Office';
import Leaderboard from '../components/Leaderboard/Leaderboard';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Game Dev Tycoon Dashboard</h1>
      <Office />
      <Leaderboard />
    </div>
  );
};

export default Dashboard;
EOL

cat > src/pages/GameStudio.js << EOL
import React from 'react';
import GameDevelopment from '../components/Game/GameDevelopment';

const GameStudio = () => {
  return (
    <div className="game-studio">
      <h1>Your Game Studio</h1>
      <GameDevelopment />
    </div>
  );
};

export default GameStudio;
EOL

cat > src/pages/Market.js << EOL
import React from 'react';
import Market from '../components/Market/Market';

const MarketPage = () => {
  return (
    <div className="market-page">
      <h1>Employee Market</h1>
      <Market />
    </div>
  );
};

export default MarketPage;
EOL

cat > src/pages/Profile.js << EOL
import React from 'react';

const Profile = () => {
  return (
    <div className="profile">
      <h1>Your Profile</h1>
      {/* Add profile information and settings here */}
    </div>
  );
};

export default Profile;
EOL

# Contenu des services
cat > src/services/api.js << EOL
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getGames = () => axios.get(\`\${API_URL}/games\`);
export const createGame = (gameData) => axios.post(\`\${API_URL}/games\`, gameData);
export const updateGame = (id, gameData) => axios.put(\`\${API_URL}/games/\${id}\`, gameData);

// Add more API calls as needed

export default {
  getGames,
  createGame,
  updateGame,
};
EOL

# Contenu des contextes
cat > src/context/GameContext.js << EOL
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
EOL

# Contenu des hooks
cat > src/hooks/useGame.js << EOL
import { useState, useEffect } from 'react';
import { getGames } from '../services/api';

const useGame = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getGames();
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};

export default useGame;
EOL

# Contenu des utilitaires
cat > src/utils/helpers.js << EOL
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const calculateGameRating = (game) => {
  // Implement game rating calculation logic
  return 5; // Placeholder
};
EOL

# Mise à jour du package.json
cat > package.json << EOL
{
  "name": "game-dev-tycoon-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL

# Création du fichier .env
cat > .env << EOL
REACT_APP_API_URL=http://localhost:5000/api
EOL

echo "Frontend structure and files have been updated in $FRONTEND_DIR"