import React, { useState } from "react";

function CreateArea({ addNote }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (evt) => {
    addNote((prev) => {
      return [...prev, note];
    });

    setNote({
      title: "",
      content: "",
    });

    evt.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name='title'
          placeholder='Title'
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          name='content'
          placeholder='Take a note...'
          rows='3'
          value={note.content}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
