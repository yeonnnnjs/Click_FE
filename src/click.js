import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./click.css";

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState();
  const name = localStorage.getItem('playerName');
  const address = "localhost";

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
    fetch('http://' + address + ':8080/addrank', {
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
    fetch('http://' + address + ':8080/getcount', {
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
    fetch('http://' + address + ':8080/setredis', {
      method: 'POST',
      body: JSON.stringify({ name, timestamp: new Date() }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        setCount(count+1);
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
      <header>
        <nav>
          <button id="rank" onClick={handleBack}>
            Home
          </button>
        </nav>
      </header>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>click</title>
      </head>
      <body>
        <div className="counter">
          <h1>돌키우기(인데 돌은 아직 안그림)</h1>
          <p id="count">{count}</p>
          <button id="increment" onKeyDown={handleKeyDown} onClick={incrementCount}>증가</button>
        </div>
        <p className='playername'>{name}</p>
      </body>
      <footer className="footer">
        <button id="rank" onClick={handleClick}>
          순위
        </button>
      </footer>
    </html>
  );
}

export default App;
