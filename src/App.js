import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleStartGame = () => {
    localStorage.setItem('playerName', name);
    navigate('/click'); 
  };

  return (
    <div className="start-screen">
      <p>이름을 입력하세요</p>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={handleInputChange}
      />
      <button onClick={handleStartGame}>시작</button>
    </div>
  );
}

export default App;
