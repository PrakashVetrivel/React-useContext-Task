import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity: 1 }];
      }
      const totalQuantity = updatedCart.reduce((acc, curr) => acc + curr.quantity, 0);
      const totalAmount = updatedCart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
      return { ...state, cart: updatedCart, totalQuantity, totalAmount };
    }
    case 'INCREASE_QUANTITY': {
      const itemId = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      const totalQuantity = updatedCart.reduce((acc, curr) => acc + curr.quantity, 0);
      const totalAmount = updatedCart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
      return { ...state, cart: updatedCart, totalQuantity, totalAmount };
    }
    case 'DECREASE_QUANTITY': {
      const itemId = action.payload;
      const updatedCart = state.cart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      const totalQuantity = updatedCart.reduce((acc, curr) => acc + curr.quantity, 0);
      const totalAmount = updatedCart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
      return { ...state, cart: updatedCart, totalQuantity, totalAmount };
    }
    case 'REMOVE_FROM_CART': {
      const itemId = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== itemId);
      const totalQuantity = updatedCart.reduce((acc, curr) => acc + curr.quantity, 0);
      const totalAmount = updatedCart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
      return { ...state, cart: updatedCart, totalQuantity, totalAmount };
    }
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const increaseQuantity = (itemId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: itemId });
  };

  const decreaseQuantity = (itemId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: itemId });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
