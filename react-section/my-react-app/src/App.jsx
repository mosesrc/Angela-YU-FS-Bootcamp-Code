import React from "react";
import Heading from "./components/Heading";
import FavoriteFoods from "./components/FavoriteFoods";
import pi, { doublePi, triplePi } from "./utility/math";
import "./App.css";

function App() {
  return (
    <div>
      <Heading />
      <FavoriteFoods />
      <p>pi: {pi}</p>
      <p>doublePi: {doublePi()}</p>
      <p>triplePi: {triplePi()}</p>
    </div>
  );
}

export default App;
