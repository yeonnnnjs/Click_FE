import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from '../Context/socketContext';
import "./game.css";

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
    console.log("ready");
    socket.emit('ready', roomName);
    setReady(true);
  };

  const setRedis = () => {
    fetch('http://' + address + ':8080/game/setredis', {
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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <title>click</title>
      </head>
      <header>
        <nav>
          <button id="rank" onClick={handleBack}>
            Home
          </button>
        </nav>
      </header>
      {
        gameStart ? (
          <body className='click-body'>
            <div className="counter">
              <h1>돌키우기(인데 돌은 아직 안그림)</h1>
              <p id="timer">{time}s/30s</p>
              <p id="count">{count}</p>
              <button id="increment" onKeyDown={handleKeyDown} onClick={incrementCount}>증가</button>
            </div>
            <p className='playername'>{name}</p>
          </body>
        ) : (
          <body>
            {ready ? (
              <p>준비 상태</p>
            ) : (
              <button onClick={handleReady}>Ready</button>
            )}
          </body>
        )
      }
    </html>
  );
}

export default Game;
