import React from 'react';
import { useNavigate } from "react-router-dom";
import "./changelog.css"

function Changelog() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <h1>CHANGELOG</h1>
                <p className='playername'>v0.0.2</p>
                <p className='playername'>새로고침 시 초기화 버그 수정</p>
                <p className='playername'>이상한 POST 날리지말고 순수노동하십쇼^^</p>
            </body>
            <footer className="footer">
                <button id="rank" onClick={handleClick}>
                    뒤로가기
                </button>
            </footer>
        </html>
    );
}

export default Changelog;
