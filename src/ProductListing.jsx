import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './ProductListing.css';

const ProductListing = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-listing">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.thumbnail} alt={product.title} className="product-image" />
          <div className="product-details">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
