import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/get_playlists")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h3>Enter Genre:</h3>
      <input></input><button>search</button>
      
      <h3>EDM</h3>
      <ol>
        {data.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ol>
    </div>
  );
}
