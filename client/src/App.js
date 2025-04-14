// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; // Assurez-vous que le chemin est correct
import Home from './pages/Home'; // Page d'accueil
import Products from './pages/Products'; // Page des produits (si nécessaire)
import Login from './pages/Login'; // Importez la page de connexion
import Register from './pages/Register'; // Importez la page d'inscription

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Affiche la barre de navigation sur toutes les pages */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />  {/* Route pour la page de connexion */}
          <Route path="/register" element={<Register />} />  {/* Route pour la page d'inscription */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
