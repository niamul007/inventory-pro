import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getProducts,
  addProduct,
  delProduct,
} from "./services/productService.js";

function App() {
  const [products, setProducts] = useState([]); // plural 'products' for the list
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Prepare the data (Conversion)
    const cleanedData = {
      ...formData,
      price: parseFloat(formData.price), // Convert "19.99" to 19.99
      stock: parseInt(formData.stock, 10), // Convert "5" to 5
    };

    // 2. Quick Validation
    if (isNaN(cleanedData.price) || isNaN(cleanedData.stock)) {
      return alert("Please enter valid numbers for Price and Stock!");
    }

    try {
      // 3. Send the CLEANED data, not the raw formData
      const response = await addProduct(cleanedData);

      const newProduct = response.data?.product || response;
      setProducts([newProduct, ...products]);

      // Reset form
      setFormData({ name: "", category: "Electronics", price: "", stock: "" });
      console.log("Product saved to Neon!");
      // Inside handleSubmit catch block
    } catch (err) {
      console.error("Validation Failed:", err);
      // This will tell us exactly which field Zod hates:
      console.log(`Error: ${err.message}`);
    }
  };
  // 1. Function to LOAD data
  const loadInventory = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

const deleteProduct = async (id) => {
    try {
      // 1. Tell the server to delete it from the Database
      await delProduct(id);

      // 2. Update the UI: Filter OUT the item with the matching ID
      // We keep every item that DOES NOT match the ID we just deleted
      const updatedList = products.filter((item) => item.id !== id);
      
      setProducts(updatedList);
      console.log("Product removed")
    } catch (err) {
      console.error("Delete failed:", err);
      console.log("product didn't delete")
    }
  };
  // 2. Run ONLY once when the component mounts
  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div className="dashboard-app">
      <div className="dashboard-container">
        <header className="main-header">
          <h1>
            Inventory <span>Pro</span>
          </h1>
          <div className="header-stats">
            <div className="stat-pill">Total: {products.length}</div>
            <div className="stat-pill low-stock-pill">
              Low: {products.filter((p) => p.stock < 5).length}
            </div>
          </div>
        </header>

        <section className="form-card">
          <h3>Add New Product</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div className="input-group">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="save-btn">
              Add Item
            </button>
          </form>
        </section>

        <main className="table-card">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="table-row-animate">
                  <td>
                    <div className="product-info">
                      <span className="product-id">#{product.id}</span>
                      <span className="product-name">{product.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${product.category.toLowerCase()}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="price-cell">
                    ${parseFloat(product.price).toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={
                        product.stock < 5 ? "stock-tag low" : "stock-tag"
                      }
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-icon edit">✎</button>
                    <button className="btn-icon delete" onClick={()=> deleteProduct(product.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default App;
