import React, { useState, useEffect } from "react";

import NumberInput from "./number-input.jsx";
import Result from "./result.jsx";

function NumberGuessingGame() {
  const [randomNumber, setRandomNumber] = useState(-1);
  const [guessedNumber, setGuessedNumber] = useState(50);
  const [text, setText] = useState("Zufallszahl wird geladen.");

  function fetchRandom() {
    fetch("/random")
      .then((res) => res.json())
      .then((res) => {
        setRandomNumber(res.number);
        setText("Raten Sie eine Zahl von 1 bis 100.");
      });
  }

  async function fetchRandomAsync() {
    const res = await fetch("/random");
    const body = await res.json();
    setRandomNumber(body.number);
    setText("Raten Sie eine Zahl von 1 bis 100.");
  }

  useEffect(fetchRandom, []);

  function handleClick() {
    if (Number.isNaN(guessedNumber)) {
      setText("Geben Sie eine gültige Zahl ein.");
    } else if (guessedNumber < randomNumber) {
      setText("Die gesuchte Zahl ist größer.");
    } else if (guessedNumber > randomNumber) {
      setText("Die gesuchte Zahl ist kleiner.");
    } else {
      setText("Gratulation! Sie haben die Zahl erraten.");
    }
  }

  return (
    <div>
      <h1>Zahlenratespiel</h1>
      <NumberInput number={guessedNumber} setNumber={setGuessedNumber} />
      <button onClick={handleClick}>Raten</button>
      <Result text={text} />
    </div>
  );
}

export default NumberGuessingGame;
