import React from 'react';
import { useCart } from '../context/CartContext'; // ✅ on utilise notre contexte
import './CartPage.css';

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est viAde.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <p>Quantité: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
