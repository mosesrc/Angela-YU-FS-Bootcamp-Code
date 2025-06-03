import React from "react";
import { useState } from "react";

function App() {
  const [fullName, setFullName] = useState({
    fName: "",
    lName: "",
  });

  function handlechange(event) {
    const {value, name} = event.target;

    setFullName((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
        };
      }
    });
  }

  return (
    <div className='container'>
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form>
        <input
          name='fName'
          placeholder='First Name'
          type='text'
          value={fullName.fName}
          onChange={handlechange}
        />
        <input
          name='lName'
          placeholder='Last Name'
          type='text'
          value={fullName.lName}
          onChange={handlechange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
