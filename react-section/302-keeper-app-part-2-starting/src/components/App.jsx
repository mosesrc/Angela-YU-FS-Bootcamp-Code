import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  const renderNotes = (note) => {
    return <Note key={note.key} title={note.title} content={note.content} />;
  };

  return (
    <div>
      <Header />
      {notes.map(renderNotes)}
      <Footer />
    </div>
  );
}

export default App;
