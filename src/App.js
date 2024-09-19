import React, { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBmi = async (e) => {
    e.preventDefault();

    // Input validation
    if (weight === '' || height === '') {
      setMessage('Please enter both weight and height');
      return;
    }

    // Send data to backend API
    const response = await fetch('http://127.0.0.1:8000/calculate-bmi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight, height }),
    });

    const data = await response.json();
    setBmi(data.bmi);
    setMessage(data.message);
  };

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBmi}>
        <div>
          <label>Weight (kg): </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Height (cm): </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button type="submit">Calculate BMI</button>
      </form>
      {bmi && (
        <div>
          <h2>Your BMI: {bmi}</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
