// src/pages/Women.jsx
import React from 'react';
import { products } from '../data'; // استيراد البيانات
import { Link } from 'react-router-dom';

export default function Women() {
  const womenProducts = products.filter(p => p.category === 'women');

  return (
     
    <div className="women-page-container">
     
    <h1>Women's Collection</h1>
      <div className="women-products-grid">
        {womenProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price:{product.price}</p>
            <p>Id:{product.id}</p>
            <p>Qty:{product.Qty}</p>
          </Link>
        ))}
      </div>
    </div>
       
  );
}