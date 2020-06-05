import React, { useState } from 'react';
import './App.css';

import Header from './Header';

function App() {
  const [counter, setCounter] = useState(0);

  function handleButtonClick() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header title={`Counter: ${counter}`} />
      <h2>{counter}</h2>
      <button onClick={handleButtonClick}>Click me!</button>
    </div>
  );
}

export default App;
