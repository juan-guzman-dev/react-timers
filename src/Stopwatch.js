import React, { useState, useEffect, useRef } from 'react';
import "./Stopwatch.css";

const Stopwatch = () => {
    const INITIAL_STATE = {
        timerOn: false, // boolean value for if the timer is on
        timerStart: 0, // the Unix Epoch (ms after 1970) time when the timer was started (or the past projected start time if the timer is resumed)
        timerTime: 0 // total time (ms) that the timer has been running since start/reset
    };

    const [timer, setTimer] = useState(INITIAL_STATE);
    const timerId = useRef()
    const { timerTime, timerOn } = timer;

    useEffect(() => {
        if (timerOn) {
            timerId.current = setInterval(() => {
                // update timerTime every 10ms
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: Date.now() - timer.timerStart
                    }
                });
            }, 10);
        }
        return () => {
            clearInterval(timerId.current)
        }
    }, [timerOn])

    const startTimer = () => {
        setTimer(timer => {
            return {
                ...timer,
                timerOn: true,
                timerTime: timer.timerTime,
                timerStart: Date.now() - timer.timerTime
            }
        });
    };

    const stopTimer = () => {
        setTimer(timer => {
            return {
                ...timer,
                timerOn: false
            }
        });
        clearInterval(timerId.current);
    };

    const resetTimer = () => {
        setTimer(timer => {
            return {
                ...timer,
                timerStart: 0,
                timerTime: 0
            }
        });
    };

    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
        <div className="Stopwatch">
            <div className="Stopwatch-header">Stopwatch</div>
            <div className="Stopwatch-display">
                {hours} : {minutes} : {seconds} : {centiseconds}
            </div>
            {timerOn === false && timerTime === 0 && (
                <button onClick={startTimer}>Start</button>
            )}
            {timerOn === true && (
                <button onClick={stopTimer}>Stop</button>
            )}
            {timerOn === false && timerTime > 0 && (
                <button onClick={startTimer}>Resume</button>
            )}
            {timerOn === false && timerTime > 0 && (
                <button onClick={resetTimer}>Reset</button>
            )}
        </div>
    );
}

export default Stopwatch;