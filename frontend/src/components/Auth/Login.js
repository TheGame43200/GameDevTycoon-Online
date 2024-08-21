import React from 'react';
import AuthForm from './AuthForm';

const Login = () => {
  const handleLogin = (data) => {
    console.log('Login attempt', data);
    // Ici, vous appellerez votre API pour authentifier l'utilisateur
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <AuthForm isLogin={true} onSubmit={handleLogin} />
    </div>
  );
};

export default Login;