import React, { useState, useEffect } from 'react';
import './Timer.css';

export const Timer = () => {
    const [seconds, setSeconds] = useState(2700); // Initial time set to 2 hours for demonstration

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds <= 0) {
                clearInterval(intervalId);
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [seconds]);

    const hours = Math.floor(seconds / 3600);
    const minutesLeft = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    return (
        <div className="timer-container">
            <p id="tleft">Time left</p>
            <div className="timer-display">
                <span id="hours">{hours<10 ? '0' : ''}{hours}:</span>
                <span id="minutes">{minutesLeft < 10 ? '0' : ''}{minutesLeft}:</span>
                <span id="seconds">{secondsLeft < 10 ? '0' : ''}{secondsLeft}</span>
            </div>
        </div>
    );
};
