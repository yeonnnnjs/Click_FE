/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import stone from "../stone.png";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState();
  const name = localStorage.getItem('playerName');
  const address = process.env.REACT_APP_API_URL;

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });

  useEffect(() => {
    getCount();
  }, []);

  const preventClose = (e) => {
    addRank();
    e.preventDefault();
    e.returnValue = "";
  };

  const addRank = () => {
    fetch(address + '/api/rank/addrank', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
  }

  const handleClick = () => {
    addRank();
    navigate('/rank');
  }

  const handleBack = () => {
    addRank();
    navigate('/');
  }

  const getCount = () => {
    fetch(address + '/api/rank/getcount', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCount(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const setRedis = () => {
    fetch(address + '/api/rank/setredis', {
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
      <div className='body'>
        <div className='click-screen'>
          <p>{count}</p>
          <a className="stone" onClick={incrementCount}>
            <img src={stone} alt="Stone Image" />
          </a>
        </div>
        <p className='playername'>{name}</p>
      </div>
      <div className="footer">
        <button className='button' onClick={handleBack}>
          Home
        </button>
        <button className='button' onClick={handleClick}>
          순위
        </button>
      </div>
    </div>
  );
}

export default App;
