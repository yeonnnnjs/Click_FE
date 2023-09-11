import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './app.css';

function Rank() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/data')
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    const handleClick = () => {
        navigate('/');
    };

    return (
        <html lang="en">
            <header>
                <button onClick={handleClick}>뒤로 가기</button>
            </header>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" type="text/css" href="styles.css" />
                <title>순위 표</title>
            </head>
            <body>
                <h1>순위 표</h1>
                <table class="rankings-table">
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>팀</th>
                            <th>승리</th>
                            <th>패배</th>
                            <th>무승부</th>
                            <th>점수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </body>
        </html>
    );
}

export default Rank;
