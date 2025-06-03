import React, {useState} from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [bgColor, setBgColor] = useState("white");
  const [name, setName] = useState("");
  const [clear, setClear] = useState(false);

  const handleClick = () => {
    setHeadingText(`Hello, ${name}`);
    setClear(true);
  };

  const handleChange = (evt) => {
    setClear(false);
    setName(evt.target.value);
  };

  const mouseOverHandler = () => {
    setBgColor("black");
  };

  const mouseOutHandler = () => {
    setBgColor("white");
  };
  
  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input onChange={handleChange} type="text" placeholder="What's your name?" value={!clear ? name : ""}/>
      <button style={{backgroundColor: bgColor}} onMouseOut={mouseOutHandler} onMouseOver={mouseOverHandler} onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App;
