import React from "react";

function NumberInput({ number, setNumber }) {
  function handleChange(e) {
    setNumber(parseInt(e.target.value));
  }

  return <input type="number" value={number} onChange={handleChange} />;
}

export default NumberInput;
