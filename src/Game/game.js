/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from '../Context/socketContext';
import stone from "../stone.png";

function Game() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [ready, setReady] = useState(false);
  const name = localStorage.getItem('playerName');
  const roomName = localStorage.getItem('roomName');
  const address = process.env.REACT_APP_API_URL;
  const [time, setTime] = useState();

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    socket.on('gameStart', (playerList) => {
      setGameStart(true);
    });

    socket.on('timer', (time) => {
      setTime(time);
    });

    socket.on('gameEnd', (playerList) => {
      navigate("/result");
    });

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
  }

  const handleBack = () => {
    navigate('/');
  }

  const handleReady = () => {
    socket.emit('readyOnGame', roomName);
    setReady(true);
  };

  const setRedis = () => {
    fetch('http://' + address + '/game/setredis', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        setCount(count + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const incrementCount = () => {
    setRedis();
  }

  return (
    <div className='div'>
      {
        gameStart ? (
          <div className='body'>
          <p id="timer">{time}s/30s</p>
          <div>
          <p id="count">{count}</p>
          <a className="stone" onClick={incrementCount}>
            <img src={stone} alt="Stone Image" />
          </a>
        </div>
            <p className='playername'>{name}</p>
          </div>
        ) : (
          <div className='body'>
            {
              ready ? (
                <p>준비 상태</p>
              ) : (
                <button onClick={handleReady}>Ready</button>
              )
            }
          </div>
        )
      }
      <div className='footer'>
        <button id="rank" onClick={handleBack}>
          Home
        </button>
      </div>
    </div>
  );
}

export default Game;
