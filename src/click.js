import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./click.css"

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const name = localStorage.getItem('playerName');
  const address = "localhost";

  useEffect(() => {
    fetch('http://'+address+':8080/getcount', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result >= 0)
          setCount(result);
      })
      .catch((error) => {
        console.error('데이터 전송 중 오류가 발생했습니다.', error);
      });

    window.addEventListener('beforeunload', addRank);
    return () => {
      window.removeEventListener('beforeunload', addRank);
    };
  }, []);

  const addRank = () => {
    fetch('http://'+address+':8080/addrank', {
      method: 'POST',
      body: JSON.stringify({ name, count }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('데이터가 성공적으로 전송되었습니다.');
        } else {
          console.error('데이터 전송 중 오류가 발생했습니다.');
        }
      })
      .catch((error) => {
        console.error('데이터 전송 중 오류가 발생했습니다.', error);
      });
  };

  const handleClick = () => {
    addRank();
    navigate('/rank');
  }

  const handleBack = () => {
    navigate('/');
  }

  const incrementCount = () => {
    setCount(count + 1);
    document.getElementById('count').textContent = count;
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
        <title>카운터</title>
      </head>
      <body>
        <div className="counter">
          <h1>카운터</h1>
          <p id="count">{count}</p>
          <button id="increment" onClick={incrementCount}>증가</button>
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
