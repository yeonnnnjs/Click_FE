import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Waitroom.css';

function WaitRoom() {
  const navigate = useNavigate();
  const title = localStorage.getItem('title');
  const name = localStorage.getItem('playerName');

  const handleBack = () => {
    navigate('/makeroom');
  };

  const handleCancel = () => {
    navigate('/roomlist');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="start-screen">
        <p>대기 중..</p>
        <p>{title} by {name}</p>
        <div className='button-container'>
          <button id='cancelbtn' onClick={handleCancel}>취소</button>
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

export default WaitRoom;
