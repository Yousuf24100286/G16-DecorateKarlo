import React, { useState, useEffect } from 'react';
import Navbar from '../navabr';
import './dk13.css';

function Dk13() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();
      setProducts(products);
      setIsLoading(false);
    }

    fetchProducts();
  }, [newProductName]);

  async function updateProduct(product) {
    const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newProductName })
    });
    console.log("newww",newProductName)
    const updatedProduct = await response.json();
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
    setNewProductName("");
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
                <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
                <button type="submit">Save</button>
              </form>
            ) : (
              <h3 onClick={() => setEditingProduct(product.id)}>{product.name}</h3>
            )}
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Dk13;
