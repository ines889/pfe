// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();

  console.log('addToCart:', addToCart); // Vérifiez que la fonction addToCart est définie

  const categories = [
    { id: 1, name: "Hommes", link: "/hommes", image: "https://via.placeholder.com/300x200?text=Hommes" },
    { id: 2, name: "Femmes", link: "/femmes", image: "https://via.placeholder.com/300x200?text=Femmes" },
    { id: 3, name: "Enfants", link: "/enfants", image: "https://via.placeholder.com/300x200?text=Enfants" }
  ];

  const recommendedProducts = [
    { id: 1, name: "T-Shirt Slim", price: 59, rating: 4, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Jean Slim Fit", price: 129, rating: 5, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Veste en Cuir", price: 299, rating: 4, image: "https://via.placeholder.com/150" }
  ];

  const handleAddToCart = (product) => {
    console.log('Produit ajouté:', product); // Déboguez si le produit est correctement ajouté
    addToCart(product);
    alert(`${product.name} ajouté au panier!`);
  };

  return (
    <div className="home-container">
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Bienvenue chez SmartFashion</h1>
          <p>Découvrez des vêtements qui vous correspondent vraiment</p>
          <Link to="/products" className="cta-btn">Voir la collection</Link>
        </div>
      </section>

      <section className="categories-section">
        <h2>Nos Catégories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={category.link} key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="recommended-section">
        <h2>Produits Recommandés</h2>
        <div className="products-grid">
          {recommendedProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < product.rating ? '#FFD700' : '#C4C4C4'} />
                  ))}
                </div>
                <p className="product-price">{product.price} DT</p>
                <button 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart(product)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
