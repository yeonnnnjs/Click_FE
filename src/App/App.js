/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate('/room');
  };

  const handleClick = () => {
    navigate('/changelog');
  };

  return (
    <div className='div'>
      <div className='body'>
        <div className="border-screen">
          <h1>돌키우기</h1>
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
        </div>
        <a>powered by ACE/Aolda Games</a>
      </div>
      <div className='footer'>
        <button id="rank" onClick={handleClick}>
          CHANGELOG
        </button>
      </div>
    </div>
  );
}

export default App;
