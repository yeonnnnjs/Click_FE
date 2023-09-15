import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./click.css"

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState();
  const name = localStorage.getItem('playerName');
  const address = "";

  useEffect(() => {
    fetch('http://' + address + ':8080/getcount', {
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
        else
          setCount(0);
      })
      .catch((error) => {
        console.error('데이터 전송 중 오류가 발생했습니다.', error);
      });

    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const preventClose = (e) => {
    addRank();
    e.preventDefault();
    e.returnValue = "";
  };

  const addRank = () => {
    fetch('http://' + address + ':8080/addrank', {
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
