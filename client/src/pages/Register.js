import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/pages/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();
      setIsLoading(false);

      if (response.ok) {
        alert('Inscription réussie 🎉');
        // Rediriger vers la page de login si tu veux
      } else {
        alert(result.message || 'Erreur loars de l’inscription');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur réseau :', error);
      alert('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            placeholder="john_doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="votre@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
            placeholder="••••••••"
          />
          <div className="password-strength">
            <div className={`strength-bar ${
              passwordStrength < 2 ? 'strength-weak' :
              passwordStrength < 4 ? 'strength-medium' : 'strength-strong'
            }`}></div>
          </div>
          <div className="password-hints">
            Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          className="auth-btn" 
          disabled={isLoading || formData.password !== formData.confirmPassword}
        >
          S'inscrire
          {isLoading && <span className="auth-loading"></span>}
        </button>
      </form>

      <div className="auth-footer">
        <p>Déjà un compte ? <Link to="/login" className="auth-link">Se connecter</Link></p>
      </div>
    </div>
  );
};

export default Register;
