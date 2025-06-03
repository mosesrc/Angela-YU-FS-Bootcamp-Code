import React from "react";
import Login from "./Login";

function App() {
  let isLoggedIn = false;
  let isRegistered = false;

  function renderConditionally() {
    if (isLoggedIn) {
      return <h1>Welcome back!</h1>;
    } else {
      return <Login isRegistered={isRegistered} />;
    }
  }

  const currentTime = new Date().getHours();
  
  return (
    <div className='container'>
      <h1>Hello</h1>
      {isLoggedIn ? <h1>Welcome back!</h1> : <Login />}
    </div>
  );
}

export default App;
