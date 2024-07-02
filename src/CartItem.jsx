import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h2>{item.title}</h2>
        <p>${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
