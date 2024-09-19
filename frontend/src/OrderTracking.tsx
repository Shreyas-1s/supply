import React, { useState, useEffect } from 'react';
import './OrderTracking.css';

type Order = {
    order_id: string;
    delivery_number: string;
    shipping_address: string;
    status: string;
    price: number;
    pieces: number;
};

const OrderTracking: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [newOrder, setNewOrder] = useState<Order>({
        order_id: '',
        delivery_number: '',
        shipping_address: '',
        status: '',
        price: 0,
        pieces: 0,
    });

    useEffect(() => {
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewOrder({
            ...newOrder,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error adding order');
            })
            .then(() => {
                setOrders([...orders, newOrder]);
                setNewOrder({
                    order_id: '',
                    delivery_number: '',
                    shipping_address: '',
                    status: '',
                    price: 0,
                    pieces: 0,
                });
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="order-tracking">
            <h1>Order Tracking</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="order_id"
                    placeholder="Order ID"
                    value={newOrder.order_id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="delivery_number"
                    placeholder="Delivery Number"
                    value={newOrder.delivery_number}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="shipping_address"
                    placeholder="Shipping Address"
                    value={newOrder.shipping_address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={newOrder.status}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newOrder.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="pieces"
                    placeholder="Pieces"
                    value={newOrder.pieces}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Order</button>
            </form>
            <div className="orders-list">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Delivery Number</th>
                            <th>Shipping Address</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Pieces</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td>{order.delivery_number}</td>
                                <td>{order.shipping_address}</td>
                                <td>{order.status}</td>
                                <td>{order.price}</td>
                                <td>{order.pieces}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTracking;
