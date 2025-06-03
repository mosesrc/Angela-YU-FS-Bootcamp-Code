import React, { useState } from "react";

const InputArea = ({ handleSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div className='form'>
      <input
        type='text'
        placeholder='Write To-Do'
        value={value}
        onChange={handleChange}
      />
      <button onClick={() => handleSubmit(value, setValue)}>
        <span>Add</span>
      </button>
    </div>
  );
};

export default InputArea;
