/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../Context/socketContext';
import { useNavigate } from "react-router-dom";

function Room() {
  const [roomName, setRoomName] = useState('');
  const name = localStorage.getItem('playerName');
  const [players, setPlayers] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [message, setMessage] = useState("");
  const [isMaker, setIsMaker] = useState(false);
  const [data, setData] = useState([]);
  const socket = useContext(SocketContext);
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
    });

    socket.on('outGame', () => {
      navigate('/');
    });

    socket.on('joinRoom', (rooms) => {
      setRoomName(rooms.roomName);
      setPlayers(rooms.players);
    });

    socket.on('inGame', () => {
      localStorage.setItem('roomName', roomName);
      navigate('/game');
    });

    socket.emit('getRoomList');

    socket.on('roomList', (roomList) => {
      setData(roomList)
    });

    (() => {
      window.addEventListener("beforeunload", leaveRoom);
    })();

    return () => {
      window.removeEventListener("beforeunload", leaveRoom);
    };
  });

  const createRoom = () => {
    socket.emit('createRoom', roomName, name);
  };

  const joinRoom = () => {
    socket.emit('joinRoom', roomName, name);
  };

  const joinRoomByList = (item) => {
    socket.emit('joinRoom', item.roomName, name);
  };

  const readyOnWait = () => {
    socket.emit('readyOnWait', roomName);
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', roomName, name);
  }

  const handleBack = () => {
    navigate('/');
  }

  return (
    <div className='div'>
      {!isInput ? (
        <div className='body'>
          <div className="border-screen room-screen">
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
          <br></br>
          <div className='rank-body'>
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>방 이름</th>
                  <th>방장</th>
                  <th>플레이어</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(data).map((item) => (
                  <tr onClick={()=>{joinRoomByList(item)}} key={item.roomName}>
                    <td>{item.roomName}</td>
                    <td>{item.maker}</td>
                    <td>{Object.keys(item.players).length}명</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='body'>
          <div className="border-screen">
            <h1>{roomName}</h1>
            <a>플레이어</a>
            {Object.values(players).map((player) => (
              <a key={player.id}>{player.name}</a>
            ))}
            {
              isMaker ? (
                <div className='button-container'>
                  <button onClick={readyOnWait}>시작</button>
                  <button onClick={leaveRoom}>나가기</button>
                </div>
              ) : (
                <div className='button-container'>
                  <button onClick={leaveRoom}>나가기</button>
                </div>
              )
            }
          </div>
          <a>{message}</a>
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