import React, { useState, useEffect } from 'react';
import './OrderTracking.css'; // Assuming you'll create a CSS file for styling

interface Order {
  id: string;
  deliveryNumber: string;
  shippingAddress: string;
  status: string;
  price: number;
  pieces: number;
}

export default function OrderTracking() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({
    deliveryNumber: '',
    shippingAddress: '',
    status: '',
    price: 0,
    pieces: 0
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'pieces' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Order added:', data);
      fetchOrders(); // Refresh the order list after adding
      setNewOrder({ deliveryNumber: '', shippingAddress: '', status: '', price: 0, pieces: 0 }); // Reset the form
    } catch (error) {
      console.error('Error adding order:', error);
      setError('Failed to add order. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Order Tracking</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="deliveryNumber"
          value={newOrder.deliveryNumber}
          onChange={handleInputChange}
          placeholder="Delivery Number"
          required
          className="input"
        />
        <input
          type="text"
          name="shippingAddress"
          value={newOrder.shippingAddress}
          onChange={handleInputChange}
          placeholder="Shipping Address"
          required
          className="input"
        />
        <input
          type="text"
          name="status"
          value={newOrder.status}
          onChange={handleInputChange}
          placeholder="Status"
          required
          className="input"
        />
        <input
          type="number"
          name="price"
          value={newOrder.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="input"
        />
        <input
          type="number"
          name="pieces"
          value={newOrder.pieces}
          onChange={handleInputChange}
          placeholder="Pieces"
          required
          className="input"
        />
        <button type="submit" className="button">Add Order</button>
      </form>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-head">Delivery Number</th>
            <th className="table-head">Shipping Address</th>
            <th className="table-head">Status</th>
            <th className="table-head">Price</th>
            <th className="table-head">Pieces</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="table-cell">{order.deliveryNumber}</td>
              <td className="table-cell">{order.shippingAddress}</td>
              <td className="table-cell">{order.status}</td>
              <td className="table-cell">{order.price}</td>
              <td className="table-cell">{order.pieces}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
