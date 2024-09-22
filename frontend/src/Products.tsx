import React, { useState, useEffect } from 'react';
import './Products.css';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', sku: '', price: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Product added:', data);
      fetchProducts(); // Refresh the product list after adding
      setNewProduct({ name: '', sku: '', price: 0 }); // Reset the form
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Products</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
          className="input"
        />
        <input
          type="text"
          name="sku"
          value={newProduct.sku}
          onChange={handleInputChange}
          placeholder="SKU"
          required
          className="input"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="input"
        />
        <button type="submit" className="button">Add Product</button>
      </form>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-head">Name</th>
            <th className="table-head">SKU</th>
            <th className="table-head">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="table-cell">{product.name}</td>
              <td className="table-cell">{product.sku}</td>
              <td className="table-cell">${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
