import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Makeroom.css';

function MakeRoom() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const name = localStorage.getItem('playerName');
  const address = process.env.REACT_APP_API_URL;

  const postMakeRoom = () => {
    fetch('http://' + address + ':8080/makeroom', {
      method: 'POST',
      body: JSON.stringify({ title, name }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStartClick = () => {
    localStorage.setItem('title', title);
    postMakeRoom();
    navigate('/waitroom');
  };

  const handleBack = () => {
    navigate('/roomlist');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="start-screen">
        <p>방 제목을 입력하세요</p>
        <input
          type="text"
          placeholder="방 제목"
          value={title}
          onChange={handleInputChange}
        />
        <div className='button-container'>
          <button onClick={handleStartClick}>방 만들기</button>
        </div>
      </body>
      <footer className="footer">
        <button onClick={handleBack}>
          뒤로가기
        </button>
      </footer>
    </html>
  );
}

export default MakeRoom;
