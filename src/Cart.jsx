import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, totalQuantity, totalAmount } = useContext(CartContext);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div>
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
