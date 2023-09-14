import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./rank.css"

function Rank() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const address = "0.0.0.0";

    useEffect(() => {
        fetch('http://'+address+':8080/getrank', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setData(result);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    const handleClick = () => {
        navigate('/click');
    };

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <h1>순위 표</h1>
                <table class="rankings-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.playerName}</td>
                                <td>{item.clickCount}</td>
                                <td>{item.timeLog}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </body>
            <footer className="footer">
                <button id="rank" onClick={handleClick}>
                    뒤로가기
                </button>
            </footer>
        </html>
    );
}

export default Rank;
