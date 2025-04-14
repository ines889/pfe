// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <h2>SmartFashion</h2>
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Rechercher..." />
          <button className="search-btn">🔍</button>
        </div>
      </div>
      <div className="navbar-right">
        <div className="nav-icons">
          <Link to="/wishlist" className="icon-link">❤️</Link>
          <Link to="/cart" className="icon-link">
            🛒
            <span className="cart-count">0</span>
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="nav-btn login-btn">Connexion</Link> {/* Lien vers la page de connexion */}
          <Link to="/register" className="nav-btn signup-btn">Inscription</Link> {/* Lien vers la page d'inscription */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
