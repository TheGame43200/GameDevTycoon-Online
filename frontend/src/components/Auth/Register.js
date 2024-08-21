import React from 'react';
import AuthForm from './AuthForm';

const Register = () => {
  const handleRegister = (data) => {
    console.log('Register attempt', data);
    // Ici, vous appellerez votre API pour enregistrer l'utilisateur
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default Register;