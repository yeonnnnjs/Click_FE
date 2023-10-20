/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./rank.css"

function Rank() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const address = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch('http://' + address + '/rank/getrank', {
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

    const handleClick = () => {
        navigate('/click');
    };

    return (
        <div className='div'>
            <div className='body'>
                <div className='rank-body'>
                <h1>순위표</h1>
                    <table className="rankings-table">
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
                                    <td>{item.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
            </div>
            <div className='footer'>
                <button onClick={handleClick}>
                    뒤로가기
                </button>
            </div>
        </div>
    );
}

export default Rank;
