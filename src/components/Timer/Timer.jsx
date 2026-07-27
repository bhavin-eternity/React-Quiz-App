import React, { useState, useEffect } from 'react';
import './Timer.css';


function Timer({ onTimeUp, questionIndex }) {
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        setTimeLeft(15);
    }, [questionIndex]);


    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);
    const percentage = (timeLeft / 15) * 100;
    const isUrgent = timeLeft <= 5;

    return (
        <div className={`timer ${isUrgent ? 'urgent' : ''}`}>
            <svg className="timer-ring" viewBox="0 0 36 36">
                <path
                    className="timer-ring-bg"
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="timer-ring-fill"
                    strokeDasharray={`${percentage}, 100`}
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
            <span className="timer-number">{timeLeft}</span>
        </div>
    );
}

export default Timer
