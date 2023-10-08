import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Waitroom.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8100');

function WaitRoom() {
  const navigate = useNavigate();
  const title = localStorage.getItem('title');
  const name = localStorage.getItem('playerName');
  const address = process.env.REACT_APP_API_URL;

  useEffect(() => {
    socket.on('ingame', () => {
        navigate('/game');
    });
  }, []);

  const deleteRoom = () => {
    fetch('http://' + address + ':8080/' + name, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleBack = () => {
    deleteRoom();
    navigate('/makeroom');
  };

  const handleCancel = () => {
    deleteRoom();
    navigate('/roomlist');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="border-screen">
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
