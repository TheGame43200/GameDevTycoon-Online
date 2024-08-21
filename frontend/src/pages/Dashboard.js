import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [companyStats, setCompanyStats] = useState({
    name: "Your Game Studio",
    funds: 100000,
    reputation: 75,
    games: 5,
    employees: 10
  });

  const [currentProjects, setCurrentProjects] = useState([
    { id: 1, name: "Super Platformer", progress: 60, team: 3 },
    { id: 2, name: "Epic RPG", progress: 30, team: 5 },
  ]);

  const [recentGames, setRecentGames] = useState([
    { id: 1, name: "Puzzle Master", sales: 50000, rating: 4.5, releaseDate: '2023-01-15' },
    { id: 2, name: "Space Shooter", sales: 75000, rating: 4.2, releaseDate: '2023-03-22' },
  ]);

  const [revenueData, setRevenueData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New technology available for research!", type: "info" },
    { id: 2, message: "Employee John Doe's productivity increased!", type: "success" },
  ]);

  useEffect(() => {
    // Ici, vous feriez normalement des appels API pour récupérer les données réelles
    // Pour l'exemple, nous allons simuler un chargement asynchrone
    const fetchData = async () => {
      // Simulation d'un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour des stats de l'entreprise
      setCompanyStats(prevStats => ({
        ...prevStats,
        funds: prevStats.funds + Math.floor(Math.random() * 10000),
        reputation: Math.min(100, prevStats.reputation + Math.floor(Math.random() * 5))
      }));

      // Mise à jour des projets
      setCurrentProjects(prevProjects =>
        prevProjects.map(project => ({
          ...project,
          progress: Math.min(100, project.progress + Math.floor(Math.random() * 10))
        }))
      );
    };

    fetchData();
    // Mettre à jour les données toutes les 5 secondes
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const startNewGame = () => {
    const newGame = { 
      id: currentProjects.length + 1, 
      name: `New Game ${currentProjects.length + 1}`, 
      progress: 0, 
      team: 1 
    };
    setCurrentProjects([...currentProjects, newGame]);
    setNotifications([...notifications, { id: Date.now(), message: `Started development of ${newGame.name}!`, type: "success" }]);
  };

  const hireEmployee = () => {
    setCompanyStats(prevStats => ({ ...prevStats, employees: prevStats.employees + 1 }));
    setNotifications([...notifications, { id: Date.now(), message: "New employee hired!", type: "success" }]);
  };

  return (
    <div className="dashboard">
      <header>
        <h1>{companyStats.name} Dashboard</h1>
        <div className="notifications">
          {notifications.map(notif => (
            <div key={notif.id} className={`notification ${notif.type}`}>
              {notif.message}
            </div>
          ))}
        </div>
      </header>
      
      <main>
        <section className="company-overview">
          <h2>Company Overview</h2>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Funds</span>
              <span className="stat-value">${companyStats.funds.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Reputation</span>
              <span className="stat-value">{companyStats.reputation}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Games Released</span>
              <span className="stat-value">{companyStats.games}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Employees</span>
              <span className="stat-value">{companyStats.employees}</span>
            </div>
          </div>
        </section>

        <section className="current-projects">
          <h2>Current Projects</h2>
          {currentProjects.map(project => (
            <div key={project.id} className="project">
              <span className="project-name">{project.name}</span>
              <div className="project-details">
                <progress value={project.progress} max="100"></progress>
                <span className="project-progress">{project.progress}%</span>
                <span className="project-team">Team: {project.team}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="recent-games">
          <h2>Recent Games</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Release Date</th>
                <th>Sales</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {recentGames.map(game => (
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>{game.releaseDate}</td>
                  <td>${game.sales.toLocaleString()}</td>
                  <td>{game.rating}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="revenue-chart">
          <h2>Revenue Over Time</h2>
          <Line data={revenueData} />
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <button onClick={startNewGame}>Start New Game</button>
          <button onClick={hireEmployee}>Hire Employee</button>
          <button>Research Technology</button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;