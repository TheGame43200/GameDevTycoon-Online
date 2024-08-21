import React, { useState, useEffect, useRef } from 'react';
import './OfficeUpgradeMenu.css';

const OfficeUpgradeMenu = ({ isOpen, onClose, currentLevel, onUpgrade }) => {
  const [visibleLevels, setVisibleLevels] = useState([]);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const levels = [
    { level: 0, employees: 1, cost: 0 },
    { level: 1, employees: 3, cost: 10000 },
    { level: 2, employees: 5, cost: 25000 },
    { level: 3, employees: 7, cost: 50000 },
    { level: 4, employees: 9, cost: 100000 },
    { level: 5, employees: 11, cost: 200000 },
    { level: 6, employees: 13, cost: 300000 },
    { level: 7, employees: 15, cost: 400000 },
    { level: 8, employees: 17, cost: 500000 },
    { level: 9, employees: 19, cost: 800000 },
    { level: 10, employees: 21, cost: 1000000 },
    { level: 11, employees: 23, cost: 2000000 },
    { level: 12, employees: 25, cost: 3000000 },
    { level: 13, employees: 27, cost: 4000000 },
    { level: 14, employees: 29, cost: 5000000 },
    { level: 15, employees: 31, cost: 6000000 },
    // Ajoutez d'autres niveaux si nécessaire
  ];

  useEffect(() => {
    updateVisibleLevels(currentLevel);
  }, [currentLevel]);

  const updateVisibleLevels = (centerLevel) => {
    const centerIndex = levels.findIndex(l => l.level === centerLevel);
    const start = Math.max(0, Math.floor(centerIndex / 3) * 3);
    setVisibleLevels(levels.slice(start, start + 3));
  };

  const handleNavigation = (direction) => {
    setAnimating(true);
    const currentStartIndex = levels.findIndex(l => l.level === visibleLevels[0].level);
    const newStartIndex = direction === 'next' 
      ? Math.min(currentStartIndex + 3, levels.length - 3) 
      : Math.max(currentStartIndex - 3, 0);
    
    if (newStartIndex !== currentStartIndex) {
      containerRef.current.style.transform = `translateX(${direction === 'next' ? '-' : ''}100%)`;
      setTimeout(() => {
        setVisibleLevels(levels.slice(newStartIndex, newStartIndex + 3));
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = 'translateX(0)';
        setTimeout(() => {
          containerRef.current.style.transition = 'transform 0.3s ease';
          setAnimating(false);
        }, 50);
      }, 300);
    } else {
      setAnimating(false);
    }
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNavigation('next');
    } else if (isRightSwipe) {
      handleNavigation('prev');
    }
  };

  if (!isOpen) return null;

  const isFirstGroup = visibleLevels[0]?.level === levels[0].level;
  const isLastGroup = visibleLevels[2]?.level === levels[levels.length - 1].level;

  return (
    <div className="office-upgrade-menu-overlay" onClick={onClose}>
      <div className="office-upgrade-menu" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Office Upgrades</h2>
        <div className="levels-navigation">
          <button 
            className={`nav-button prev ${isFirstGroup ? 'disabled' : ''}`} 
            onClick={() => !isFirstGroup && handleNavigation('prev')} 
            disabled={animating || isFirstGroup}
          >
            &lt;
          </button>
          <div className="levels-container-wrapper">
            <div 
              className="levels-container" 
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {visibleLevels.map((level) => (
                <div key={level.level} className={`level-card ${level.level === currentLevel ? 'current' : ''}`}>
                  <h3>Level {level.level}</h3>
                  <p>Max Employees: {level.employees}</p>
                  <p>Cost: ${level.cost}</p>
                  <button 
                    className={currentLevel >= level.level ? 'purchased' : 'upgrade'}
                    onClick={() => onUpgrade(level.level)} 
                    disabled={currentLevel >= level.level}
                  >
                    {currentLevel >= level.level ? 'Purchased' : 'Upgrade'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button 
            className={`nav-button next ${isLastGroup ? 'disabled' : ''}`} 
            onClick={() => !isLastGroup && handleNavigation('next')} 
            disabled={animating || isLastGroup}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeUpgradeMenu;