import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([
    { title: "Note title", content: "Note content" },
  ]);

  const deleteNote = (id) => {
    setNotes(prev => {
      return prev.filter((note, idx) => id !== idx);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={setNotes} />
      {notes.map((note, index) => (
        <Note key={index} id={index} title={note.title} content={note.content} onDelete={deleteNote} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
