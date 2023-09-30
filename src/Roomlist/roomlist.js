import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./roomlist.css"

function RoomList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const address = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch('http://' + address + ':8080/getroom', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    const handleMakeRoom = () => {
        navigate('/makeroom');
    };

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
            </head>
            <header>
                <nav>
                    <button onClick={handleBack}>
                        Home
                    </button>
                </nav>
            </header>
            <body className='roomlist-body'>
                <h1>대기 중인 대결</h1>
                <ul>
                    {data.map((room) => (
                        <li key={room.id}>
                            <strong>{room.name}</strong> - {room.players} 플레이어 - {room.mode}
                        </li>
                    ))}
                </ul>
            </body>
            <footer className="footer">
                <button onClick={handleMakeRoom}>
                    방 만들기
                </button>
            </footer>
        </html>
    );
}

export default RoomList;
