import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameList from './components/GameList';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import RegisterAdmin from './components/RegisterAdmin';
import { getEmployees, addEmployee, getGames, createGame } from './apiService';
import ReviewForm from './components/ReviewForm';

function App() {
  const [employees, setEmployees] = useState([]);
  const [games, setGames] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', development: 0, graphics: 0, ai: 0, gameDesign: 0, sound: 0, overallRating: 0, potential: 0 });
  const [newGame, setNewGame] = useState({ title: '', genre: '', releaseDate: '', rating: 0 });

  useEffect(() => {
    async function fetchData() {
      const employeesData = await getEmployees();
      setEmployees(employeesData);
      const gamesData = await getGames();
      setGames(gamesData);
    }
    fetchData();
  }, []);

  const handleAddEmployee = async () => {
    const addedEmployee = await addEmployee(newEmployee);
    setEmployees([...employees, addedEmployee]);
  };

  const handleAddGame = async () => {
    const addedGame = await createGame(newGame);
    setGames([...games, addedGame]);
  };

  return (
    <Router>
      <div>
        <h1>Welcome to GameDev Tycoon Online</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/register-admin" component={RegisterAdmin} /> {/* Ajout de la route RegisterAdmin */}
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={GameList} />
        </Switch>
        <div>
          <h1>Employees</h1>
          <ul>
            {employees.map(emp => (
              <li key={emp._id}>{emp.name}</li>
            ))}
          </ul>
          <h1>Add Employee</h1>
          <input type="text" placeholder="Name" onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
          <input type="number" placeholder="Development" onChange={e => setNewEmployee({ ...newEmployee, development: e.target.value })} />
          <input type="number" placeholder="Graphics" onChange={e => setNewEmployee({ ...newEmployee, graphics: e.target.value })} />
          <input type="number" placeholder="AI" onChange={e => setNewEmployee({ ...newEmployee, ai: e.target.value })} />
          <input type="number" placeholder="Game Design" onChange={e => setNewEmployee({ ...newEmployee, gameDesign: e.target.value })} />
          <input type="number" placeholder="Sound" onChange={e => setNewEmployee({ ...newEmployee, sound: e.target.value })} />
          <input type="number" placeholder="Overall Rating" onChange={e => setNewEmployee({ ...newEmployee, overallRating: e.target.value })} />
          <input type="number" placeholder="Potential" onChange={e => setNewEmployee({ ...newEmployee, potential: e.target.value })} />
          <button onClick={handleAddEmployee}>Add Employee</button>

          <h1>Games</h1>
          <ul>
            {games.map(game => (
              <li key={game._id}>{game.title}</li>
            ))}
          </ul>
          <h1>Add Game</h1>
          <input type="text" placeholder="Title" onChange={e => setNewGame({ ...newGame, title: e.target.value })} />
          <input type="text" placeholder="Genre" onChange={e => setNewGame({ ...newGame, genre: e.target.value })} />
          <input type="date" placeholder="Release Date" onChange={e => setNewGame({ ...newGame, releaseDate: e.target.value })} />
          <input type="number" placeholder="Rating" onChange={e => setNewGame({ ...newGame, rating: e.target.value })} />
          <button onClick={handleAddGame}>Add Game</button>

          <h1>Avis sur le Jeu</h1>
          <ReviewForm gameId="game-id-here" />
        </div>
      </div>
    </Router>
  );
}

export default App;
