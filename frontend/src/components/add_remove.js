import React, { useState } from 'react';
import './store.css';

function Store() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct('');
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleNewProductChange = (event) => {
    setNewProduct(event.target.value);
  };

  return (
    <div>
      <h1>Store here</h1>
      <div className="product-cards">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-name">{product}</div>
            <button className="remove-button" onClick={() => handleRemoveProduct(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="add-product">
        <input className="product-input" type="text" value={newProduct} onChange={handleNewProductChange} />
        <button className="add-button" onClick={handleAddProduct}>Add Product</button>
      </div>
      
    </div>
  );
}

export default Store;
