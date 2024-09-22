import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SuperAdmin.css';


interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const SuperAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<User[]>('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      setError('Error fetching products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:5000/delete_user/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Error deleting user. Please try again later.');
      console.error('Error deleting user:', err);
    }
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
  };

  const handleUpdateUser = async () => {
    if (editUser) {
      try {
        await axios.put(`http://localhost:5000/update_user/${editUser.id}`, editUser);
        fetchUsers(); // Refresh the user list
        setEditUser(null);
      } catch (err) {
        setError('Error updating user. Please try again later.');
        console.error('Error updating user:', err);
      }
    }
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }
  };

  const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      fetchProducts(); // Refresh the product list
      setNewProduct({});
    } catch (err) {
      setError('Error adding product. Please try again later.');
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="superadmin-container">
      
      <div className="main-content">
        <div className="header">
          <h1>Manage Users and Products</h1>
        </div>

        <div className="table-container">
          <h2>Manage Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="button" onClick={() => handleEditUser(user)}>Edit</button>
                      <button className="button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {editUser && (
            <div className="edit-user">
              <h2>Edit User</h2>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={handleChangeUser}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChangeUser}
              />
              <label>Role:</label>
              <input
                type="text"
                name="role"
                value={editUser.role}
                onChange={handleChangeUser}
              />
              <button className="button" onClick={handleUpdateUser}>Update</button>
              <button className="button cancel-button" onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default SuperAdmin;
