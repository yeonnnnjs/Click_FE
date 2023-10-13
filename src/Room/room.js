import React, { useState, useEffect } from 'react';
import { socket } from '../Context/socketContext';
import { useNavigate } from "react-router-dom";
import "./room.css"

function Room() {
  const [roomName, setRoomName] = useState('');
  const name = localStorage.getItem('playerName');
  const [players, setPlayers] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('roomCreated', (roomName, playerList) => {
      console.log("roomCreated", roomName);
      setRoomName(roomName);
      console.log(JSON.stringify(playerList));
      setPlayers(playerList);
    });

    socket.on('updatePlayers', (playerList) => {
      console.log("updatePlayers", playerList);
      setPlayers(playerList);
      console.log(players);
    });

    socket.on('inGame', () => {
      console.log("inGame");
      localStorage.setItem('roomName', roomName);
      navigate('/game');
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
          <h1>방 이름: {roomName}</h1>
          <h2>플레이어 목록:</h2>
          <ul>
            {Object.values(players).map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Room;
