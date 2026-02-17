import React, { useState } from 'react';
import './App.css';

function App() {
  // We will replace this dummy data with your Neon DB data tomorrow!
  const [products, setProducts] = useState([
    { id: 1, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, stock: 15 },
    { id: 2, name: "Gaming Mouse", category: "Electronics", price: 45.00, stock: 0 },
  ]);

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <h1>Inventory Pro</h1>
        <button className="add-btn">+ Add Product</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card">Total Items: {products.length}</div>
        <div className="stat-card low-stock">Out of Stock: {products.filter(p => p.stock === 0).length}</div>
      </section>

      <main className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td><span className="badge">{product.category}</span></td>
                <td>${product.price}</td>
                <td className={product.stock < 5 ? 'text-danger' : ''}>{product.stock}</td>
                <td>
                  <button className="edit-link">Edit</button>
                  <button className="delete-link">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;