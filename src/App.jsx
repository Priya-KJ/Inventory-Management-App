// Import necessary libraries
import React, { useState } from "react";
import "./App.css";

const InventoryApp = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Apples", category: "Fruits", quantity: 15 },
    { id: 2, name: "Bananas", category: "Fruits", quantity: 8 },
    { id: 3, name: "Carrots", category: "Vegetables", quantity: 12 },
  ]);
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });

  // Add a new item
  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setItems([
        ...items,
        {
          id: items.length + 1,
          name: newItem.name,
          category: newItem.category,
          quantity: parseInt(newItem.quantity, 10),
        },
      ]);
      setNewItem({ name: "", category: "", quantity: "" });
    }
  };

  // Edit an item
  const editItem = (id, updatedItem) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
  };

  // Delete an item
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Filter items by category
  const filteredItems = filter
    ? items.filter((item) => item.category.toLowerCase().includes(filter.toLowerCase()))
    : items;

  // Sort items by quantity
  const sortedItems = [...filteredItems].sort((a, b) =>
    sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="app">
      <h1>Inventory Management</h1>

      {/* Add Item Form */}
      <div className="add-item">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Filter by Category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort by Quantity ({sortAsc ? "Asc" : "Desc"})
        </button>
      </div>

      {/* Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className={item.quantity < 10 ? "low-stock" : ""}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  onClick={() =>
                    editItem(item.id, {
                      name: prompt("New name", item.name) || item.name,
                      category: prompt("New category", item.category) || item.category,
                      quantity: parseInt(prompt("New quantity", item.quantity), 10) || item.quantity,
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryApp;
