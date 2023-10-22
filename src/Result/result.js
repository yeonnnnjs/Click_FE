/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from '../Context/socketContext';

function Result() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const roomName = localStorage.getItem('roomName');
    const name = localStorage.getItem('playerName');
    const address = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(address + '/api/game/getscore', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                socket.emit('addResult', roomName, name, result);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    useEffect(() => {
        socket.on('result', (result) => {
            setData(result);
        });
    });

    const handleBack = () => {
        socket.emit('leaveRoom', roomName);
        navigate('/');
    }

    return (
        <div className='div'>
            <div className='body'>
                <div className='rank-body'>
                    <h1>{roomName} 결과</h1>
                    <table className="rankings-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(data).map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='footer'>
                    <button id="rank" onClick={handleBack}>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;
