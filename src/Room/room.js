/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { socket } from '../Context/socketContext';
import { useNavigate } from "react-router-dom";

function Room() {
  const [roomName, setRoomName] = useState('');
  const name = localStorage.getItem('playerName');
  const [players, setPlayers] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [message, setMessage] = useState("");
  const [isMaker, setIsMaker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('roomCreated', (roomName, playerList) => {
      setIsInput(true);
      setIsMaker(true);
      setRoomName(roomName);
      setPlayers(playerList);
    });

    socket.on('updatePlayers', (playerList) => {
      setIsInput(true);
      setPlayers(playerList);
    });

    socket.on('errorHandling', (msg) => {
      setMessage(msg);
    })

    socket.on('inGame', () => {
      localStorage.setItem('roomName', roomName);
      navigate('/game');
    });
  });

  const createRoom = () => {
    socket.emit('createRoom', roomName, name);
  };

  const joinRoom = () => {
    socket.emit('joinRoom', roomName, name);
  };

  const readyOnWait = () => {
    socket.emit('readyOnWait', roomName);
  };

  const handleBack = () => {
    navigate('/');
  }

  return (
    <div className='div'>
      {!isInput ? (
        <div className='body'>
          <div className="border-screen">
            <input
              type="text"
              placeholder="방 이름"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className='button-container'>
              <div className='button-container'>
                <button onClick={createRoom}>방 만들기</button>
                <button onClick={joinRoom}>방 입장</button>
              </div>
            </div>
          </div>
          <a>{message}</a>
        </div>
      ) : (
        <div className='body'>
          <div className="border-screen">
            <h1>{roomName}</h1>
            {Object.values(players).map((player) => (
              <a key={player.id}>{player.name}</a>
            ))}
            <div className='button-container'>
              {
                isMaker ? (
                  <button onClick={readyOnWait}>준비</button>
                ) : (
                  <a>대기 중..</a>
                )
              }
            </div>
          </div>
        </div>
      )}
      <div className='footer'>
        <button id="rank" onClick={handleBack}>
          Home
        </button>
      </div>
    </div>
  );
}

export default Room;