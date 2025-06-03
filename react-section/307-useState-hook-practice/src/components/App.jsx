import React, {useState, set} from "react";

function App() {
  
  const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, 8));

  function updateTime() {
    setTime(new Date().toLocaleTimeString().slice(0, 8));
  }

  setInterval(updateTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
