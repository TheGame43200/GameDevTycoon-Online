import React, { useState, useEffect } from 'react';
import './GameInterface.css';
import deskImage from './img/desk.png';
import bedImage from './img/bed.png';
import doorImage from './img/door.png';
import profileImage from './img/profile.png';
import OfficeUpgradeMenu from './shop/OfficeUpgradeMenu';

const GameInterface = () => {
  // -------------------- État du jeu --------------------
  const [game, setGame] = useState({
    year: 1,
    month: 11,
    week: 8,
    fans: 51,
    cash: 27100,
    bugs: 0,
    design: 4,
    tech: 5,
    research: 24
  });

  // -------------------- État des menus --------------------
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isOfficeUpgradeMenuOpen, setIsOfficeUpgradeMenuOpen] = useState(false);
  const [officeLevel, setOfficeLevel] = useState(0);

  // -------------------- Effets --------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setGame(prevGame => ({
        ...prevGame,
        week: prevGame.week + 1,
        month: prevGame.week > 4 ? (prevGame.month % 12) + 1 : prevGame.month,
        year: prevGame.month > 12 ? prevGame.year + 1 : prevGame.year,
        cash: prevGame.cash + Math.floor(Math.random() * 1000)
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu && !event.target.closest('.context-menu') && !event.target.closest('.clickable-item')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  useEffect(() => {
    if (activeMenu) {
      const menu = document.querySelector('.context-menu');
      if (menu) {
        menu.classList.remove('closing');
        void menu.offsetWidth; // Force reflow
        menu.classList.add('visible');
      }
    }
  }, [activeMenu]);

  // -------------------- Gestionnaires d'événements --------------------
  const handleItemClick = (event, menuType) => {
    event.preventDefault();
    const newPosition = {
      x: event.clientX + 2,
      y: event.clientY + 2
    };

    if (activeMenu === menuType) {
      closeMenu();
    } else {
      setMenuPosition(newPosition);
      setActiveMenu(menuType);
    }
  };

  const closeMenu = () => {
    const menu = document.querySelector('.context-menu');
    if (menu) {
      menu.classList.add('closing');
      menu.classList.remove('visible');
      setTimeout(() => {
        setActiveMenu(null);
      }, 300); // Correspond à la durée de l'animation CSS
    } else {
      setActiveMenu(null);
    }
  };

  const handleMenuItemClick = (action) => {
    console.log(`Action sélectionnée : ${action}`);
    if (action === 'officeUpdate') {
      setIsOfficeUpgradeMenuOpen(true);
    }
    closeMenu();
  };

  const handleOfficeUpgradeMenuClose = () => {
    setIsOfficeUpgradeMenuOpen(false);
  };

  const handleUpgrade = (level) => {
    // Ici, vous pouvez ajouter la logique pour vérifier si le joueur a assez d'argent, etc.
    setOfficeLevel(level);
    // Mettez à jour d'autres états si nécessaire (par exemple, le nombre max d'employés)
  };

  // -------------------- Rendu du composant --------------------
  return (
    <div className="game-interface">
      <div className="top-bar">
        <div className="player-profile">
          <img src={profileImage} alt="Player Profile" className="profile-image" />
        </div>
        <div className="game-stats">
          <div className="stat-group">
            <div className="stat-item">
              <span className="stat-circle bugs">{game.bugs}</span>
              <span className="stat-label">BUGS</span>
            </div>
            <div className="stat-item">
              <span className="stat-circle design">{game.design}</span>
              <span className="stat-label">DESIGN</span>
            </div>
          </div>
          <div className="project-name">
            <span className="project-label">CURRENT PROJECT</span>
            <span className="project-value">No Project</span>
          </div>
          <div className="stat-group">
            <div className="stat-item">
              <span className="stat-circle tech">{game.tech}</span>
              <span className="stat-label">TECH</span>
            </div>
            <div className="stat-item">
              <span className="stat-circle research">{game.research}</span>
              <span className="stat-label">RESEARCH</span>
            </div>
          </div>
        </div>
        <div className="player-stats">
          <div className="stat-row">
            <span className="stat-value">{game.fans} Fans Y{game.year} M{game.month} W{game.week}</span>
          </div>
          <div className="stat-row">
            <span className="stat-value">Cash: ${(game.cash / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>
      <div className="game-area">
        <div className="office isometric">
          <img
            src={deskImage}
            onClick={(e) => handleItemClick(e, 'desk')}
            onContextMenu={(e) => handleItemClick(e, 'desk')}
            alt="Bureau"
            className="desk clickable-item"
          />
          <img src={bedImage} onContextMenu={(e) => e.preventDefault()} alt="Lit" className="bed" />
          <img
            src={doorImage}
            onClick={(e) => handleItemClick(e, 'door')}
            onContextMenu={(e) => handleItemClick(e, 'door')}
            alt="Porte"
            className="door clickable-item"
          />
          <div className="wall left"></div>
          <div className="wall right"></div>
          <div className="floor"></div>
        </div>
      </div>
      <div className="bottom-bar">
        <button>New Game</button>
        <button>Research</button>
        <button>Market</button>
      </div>
      {activeMenu && (
        <div
          className={`context-menu ${activeMenu ? 'visible' : ''}`}
          style={{
            position: 'fixed',
            left: `${menuPosition.x}px`,
            top: `${menuPosition.y}px`
          }}
        >
          {activeMenu === 'door' && (
            <>
              <button onClick={() => handleMenuItemClick('officeUpdate')}>Office Update</button>
              <button onClick={() => handleMenuItemClick('work')}>Work on current project</button>
              <button onClick={() => handleMenuItemClick('improve')}>Improve skills</button>
              <button onClick={() => handleMenuItemClick('organize')}>Organize desk</button>
              <button onClick={() => handleMenuItemClick('coffee')}>Take a coffee break</button>
            </>
          )}
          {activeMenu === 'desk' && (
            <>
              <button onClick={() => handleMenuItemClick('develop')}>Develop New Game...</button>
              <button onClick={() => handleMenuItemClick('history')}>Game History...</button>
              <button onClick={() => handleMenuItemClick('research')}>Research...</button>
              <button onClick={() => handleMenuItemClick('report')}>Generate game report...</button>
              <button onClick={() => handleMenuItemClick('cheat')}>CheatMode...</button>
            </>
          )}
        </div>
      )}
      <OfficeUpgradeMenu 
        isOpen={isOfficeUpgradeMenuOpen} 
        onClose={handleOfficeUpgradeMenuClose} 
        currentLevel={officeLevel}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default GameInterface;