import './app.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  let count = 0;

  const handleClick = () => {
    navigate('/rank');
  }

  const incrementCount = () => {
    count++;
    document.getElementById('count').textContent = count;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="styles.css" />
        <title>카운터</title>
      </head>
      <body>
        <div className="counter">
          <h1>카운터</h1>
          <p id="count">{count}</p>
          <button id="increment" onClick={incrementCount}>증가</button>
        </div>
        <br></br>
        <div>
          <button id="rank" onClick={handleClick}>순위</button>
        </div>
      </body>
    </html>

  );
}

export default App;
