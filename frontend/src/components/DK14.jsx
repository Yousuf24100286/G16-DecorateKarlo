import React, { useState, useEffect } from 'react';
import Navbar from '../navabr';
import './dk13.css';

function Dk14() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductDescription, setNewProductDescription] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();
      setProducts(products);
      setIsLoading(false);
    }

    fetchProducts();
  }, [newProductDescription]);

  async function updateProduct(product) {
    const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: newProductDescription })
    });
    const updatedProduct = await response.json();
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
    setNewProductDescription("");
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
            {editingProduct === product.id ? (
              <form onSubmit={(e) => {
                  e.preventDefault();
                  updateProduct(product);
              }}>
                <textarea value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <h3>{product.name}</h3>
                <p onClick={() => setEditingProduct(product.id)}>{product.description}</p>
              </>
            )}
            <p>Price: ${product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Dk14;
