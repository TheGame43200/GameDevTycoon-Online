import React, { useState } from 'react';
import axios from 'axios';

const RegisterAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.61:5000/api/auth/register-admin', { name, email, password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Admin registration successful');
    } catch (error) {
      console.error(error);
      alert('Admin registration failed');
    }
  };

  return (
    <div>
      <h2>Register Admin</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
