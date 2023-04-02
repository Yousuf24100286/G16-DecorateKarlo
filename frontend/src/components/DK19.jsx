import React, { useState, useEffect } from 'react';
import Navbar from '../navabr';
import './dk19.css';
function Dk19() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    useEffect(() => {
      async function fetchProducts() {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        setProducts(products);
        setIsLoading(false);
      }
  
      fetchProducts();
    }, []);
  
    function handleProductClick(product) {
      setSelectedProduct(product);
    }
  
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }
  
    return (
      <>
      <Navbar/>
        <div className="card-container">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="card-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="card-content">
                <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="popup">
            <div className="popup-content">
              <h3>{selectedProduct.name}</h3>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
              <p>{selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              <button onClick={() => setSelectedProduct(null)}>Close</button>
            </div>
          </div>
        )}
      </>
    );
  }
  export default Dk19;  