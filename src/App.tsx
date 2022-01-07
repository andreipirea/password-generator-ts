import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState<string>("");
  const [lengthInput, setLengthInput] = useState<number>(20);
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [number, setNumber] = useState<boolean>(true);
  const [symbol, setSymbol] = useState<boolean>(true);

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  const randomFunction: any = {
    lowercase: getRandomLower,
    uppercase: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  const handleGeneratePassword = () => {
    let generatedPassword = "";
    if (lengthInput == 0) {
      return;
    }
    const typesArr = [
      { lowercase },
      { uppercase },
      { number },
      { symbol },
    ].filter((item) => Object.values(item)[0]);

    if (typesArr.length === 0) {
      return "";
    }

    for (let i = 0; i < lengthInput; i += typesArr.length) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunction[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, lengthInput);

    setResult(finalPassword);
  };

  const handleCopyToClipboard = () => {
    const textarea = document.createElement("textarea");
    const password = result;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard!");
    setResult("");
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <span id="result">{result}</span>
          <button
            className="btn"
            id="clipboard"
            onClick={handleCopyToClipboard}
          >
            <i className="far fa-clipboard"></i>
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label>Password Length</label>
            <input
              type="number"
              id="length"
              min="4"
              max="20"
              value={`${lengthInput}`}
              onChange={(e) => setLengthInput(+e.target.value)}
            />
          </div>
          <div className="setting">
            <label>Include uppercase letters</label>
            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              // value={`${uppercase}`}
              onChange={() => setUppercase(!uppercase)}
            />
          </div>
          <div className="setting">
            <label>Include lowercase letters</label>
            <input
              type="checkbox"
              id="lowercase"
              checked={lowercase}
              // value={`${lowercase}`}
              onChange={(e) => setLowercase(!lowercase)}
            />
          </div>
          <div className="setting">
            <label>Include numbers</label>
            <input
              type="checkbox"
              id="numbers"
              checked={number}
              // value={`${number}`}
              onChange={(e) => setNumber(!number)}
            />
          </div>
          <div className="setting">
            <label>Include symbols</label>
            <input
              type="checkbox"
              id="symbols"
              checked={symbol}
              // value={`${symbol}`}
              onChange={(e) => setSymbol(!symbol)}
            />
          </div>
        </div>
        <button
          className="btn btn-large"
          id="generate"
          onClick={handleGeneratePassword}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
