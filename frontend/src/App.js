import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameList from './components/GameList';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import RegisterAdmin from './components/RegisterAdmin';

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to GameDev Tycoon Online</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/register-admin" component={RegisterAdmin} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={GameList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
