import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [items, setItems] = useState([]);

  const handleSubmit = (value, clear) => {
    setItems((prev) => [...prev, value.trim()]); // Using spread operator to add new item
    clear(""); // Clear the input field after adding the item
  };

  const deleteItem = (index) => {
    console.log(index);
    setItems((prev) => {
      return prev.filter((item, i) => {
        return i !== index; // Filter out the item that matches the index
      });
    });
  };

  return (
    <div className='container'>
      <div className='heading'>
        <h1>To-Do List</h1>
      </div>
     <InputArea handleSubmit={handleSubmit} />
      <div>
        <ul>
          {items.map((item, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={item}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
