import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./roomlist.css"
import io from 'socket.io-client';

const socket = io('http://localhost:8100');

function RoomList() {
    const navigate = useNavigate();
    const name = localStorage.getItem('playerName');
    const [data, setData] = useState([]);
    const address = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch('http://' + address + ':8080/roomlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

    const joinRoom = (item) => {
       socket.emit('joinRoom', item.title, name);
       navigate('/game');
    }

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
                <table className="rankings-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Player Name</th>
                            <th>Time</th>
                            <th>Play</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.name}</td>
                                <td>{item.timestamp}</td>
                                <td>
                                    <button onClick={() => joinRoom(item)}>
                                        Play
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
