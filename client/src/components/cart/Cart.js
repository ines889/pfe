// src/pages/Cart.js
import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h2>Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.quantity} × {item.price} DT
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;