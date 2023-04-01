import React, { useState,useEffect } from 'react';
import Navbar from './navabr';
import './store.css';

function Store() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
  });
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();
      setProducts(products);
    }

    fetchProducts();
  }, [newProduct]);
  const handleAddProduct = () => {
    const { name, description, price } = newProduct;
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({
          name: '',
          description: '',
          price: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  function handleRemoveProduct(index) {
    const productId = products[index].id;
        fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
      } else {
        throw new Error('Failed to delete product');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  return (
    <div>
      <Navbar/>
      <h1>Store here</h1>

      <div className="add-product">
      <div className='input-box'>
      <label>Product Name:</label>
      <input className="product-input" type="text" value={newProduct.name} name="name" onChange={handleNewProductChange} />
      </div>
      <div className='input-box'>
      <label>Product Description:</label>
      <input className="product-input" type="text" value={newProduct.description} name="description" onChange={handleNewProductChange} />
      </div>
      <div className='input-box'>
      <label>Product Price:</label>
      <input className="product-input" type="text" value={newProduct.price} name="price" onChange={handleNewProductChange} />
      </div>
      
      
   
        <button className="add-button" onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="card-container">
  {products.map((product, index) => (
    <div key={product.id} className="card">
      <div className="card-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="card-content">
        <>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </>
        <p>Price: ${product.price}</p>
        <button className="remove-button" onClick={() => handleRemoveProduct(index)}>Remove</button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Store;
