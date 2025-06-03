import React from "react";
import Term from "../Term";
import emojipedia from "../emojipedia";

function App() {
  const createTerm = (emoji) => {
    return (
      <Term
        key={emoji.id}
        emoji={emoji.emoji}
        name={emoji.name}
        meaning={emoji.meaning}
      />
    );
  }

  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
       {emojipedia.map(createTerm)}
      </dl>
    </div>
  );
}

export default App;
