import React, { useState, useEffect } from 'react';
import './Shipments.css';  // Import your CSS file

interface Shipment {
  id: string;
  shipmentNumber: string;
  destination: string;
  status: string;
  date: string;
}

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [newShipment, setNewShipment] = useState<Omit<Shipment, 'id'>>({
    shipmentNumber: '',
    destination: '',
    status: '',
    date: '',
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await fetch('/api/shipments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShipments(data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShipment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShipment),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Shipment added:', data);
      fetchShipments();
      setNewShipment({ shipmentNumber: '', destination: '', status: '', date: '' });
    } catch (error) {
      console.error('Error adding shipment:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Shipments</h1>
        <input
          type="text"
          name="shipmentNumber"
          value={newShipment.shipmentNumber}
          onChange={handleInputChange}
          placeholder="Shipment Number"
          required
          className="input"
        />
        <input
          type="text"
          name="destination"
          value={newShipment.destination}
          onChange={handleInputChange}
          placeholder="Destination"
          required
          className="input"
        />
        <input
          type="text"
          name="status"
          value={newShipment.status}
          onChange={handleInputChange}
          placeholder="Status"
          required
          className="input"
        />
        <input
          type="date"
          name="date"
          value={newShipment.date}
          onChange={handleInputChange}
          required
          className="input"
        />
        <button type="submit" className="button">Add Shipment</button>
      </form>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-head">Shipment Number</th>
            <th className="table-head">Destination</th>
            <th className="table-head">Status</th>
            <th className="table-head">Date</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(shipment => (
            <tr key={shipment.id}>
              <td className="table-cell">{shipment.shipmentNumber}</td>
              <td className="table-cell">{shipment.destination}</td>
              <td className="table-cell">{shipment.status}</td>
              <td className="table-cell">{shipment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
