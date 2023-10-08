import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleStartClick = () => {
    localStorage.setItem('playerName', name);
    navigate('/click');
  };

  const handleStartGame = () => {
    localStorage.setItem('playerName', name);
    navigate('/game');
  };

  const handleClick = () => {
    navigate('/changelog');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="border-screen">
        <p>이름을 입력하세요</p>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleInputChange}
        />
        <div className='button-container'>
          <button onClick={handleStartClick}>기록</button>
          <button onClick={handleStartGame}>대결</button>
        </div>
      </body>
      <footer className="footer">
        <button id="rank" onClick={handleClick}>
          CHANGELOG
        </button>
      </footer>
    </html>
  );
}

export default App;
