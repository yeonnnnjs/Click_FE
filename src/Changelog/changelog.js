/* eslint-disable */
import React from 'react';
import { useNavigate } from "react-router-dom";

function Changelog() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    return (
        <div>
            <div className='body'>
                <h1>CHANGELOG</h1>
                <h2>v0.0.7</h2>
                <p className='playername'>모바일 환경에서 확대/축소 비활성화</p>
                <p className='playername'>대결모드 추가</p>
                <h2>v0.0.6</h2>
                <p className='playername'>Timestamp logic Backend로 이동</p>
                <p className='playername'>Response Msg 수정</p>
                <h2>v0.0.5</h2>
                <p className='playername'>Event logic Backend로 이동</p>
                <h2>v0.0.4</h2>
                <p className='playername'>Redis 적용</p>
                <h2>v0.0.3</h2>
                <p className='playername'>Event Sourcing 적용</p>
                <p className='playername'>순위표에서 count가 같다면 시간이 빠른 순으로 정렬</p>
                <h2>v0.0.2</h2>
                <p className='playername'>새로고침 시 초기화 버그 수정</p>
                <p className='playername'>이상한 POST 날리지말고 순수노동하십쇼^^</p>
            </div>
            <div className="footer">
                <button id="rank" onClick={handleClick}>
                    뒤로가기
                </button>
            </div>
        </div>
    );
}

export default Changelog;
