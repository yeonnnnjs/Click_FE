import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8100');

function App() {
  const [roomName, setRoomName] = useState('');
  const name = localStorage.getItem('playerName');
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on('roomCreated', (roomName, playerList) => {
      console.log("roomCreated", roomName);
      setRoomName(roomName);
      setPlayers(playerList);
    });

    socket.on('updatePlayers', (playerList) => {
      console.log("updatePlayers", playerList);
      setPlayers(playerList);
    });

    socket.on('gameStart', () => {
      console.log("gameStart");
      setGameStarted(true);
      setReady(false);
    });
  });

  const createRoom = () => {
    console.log("create", roomName, name);
    setIsInput(true);
    socket.emit('createRoom', roomName, name);
  };

  const joinRoom = () => {
    console.log("join", roomName, name);
    setIsInput(true);
    socket.emit('joinRoom', roomName, name);
  };

  const handleReady = () => {
    console.log("ready");
    socket.emit('ready', roomName);
    setReady(true);
  };

  return (
    <div>
      {!isInput ? (
        <div>
          <input
            type="text"
            placeholder="방 이름"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={createRoom}>방 만들기</button>
          <button onClick={joinRoom}>방 입장</button>
        </div>
      ) : (
        <div>
          <h1>대기실 - 방 이름: {roomName}</h1>
          <h2>플레이어 목록:</h2>
          <ul>
            {players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
          {ready ? (
            <p>준비 상태</p>
          ) : (
            <button onClick={handleReady}>Ready</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
