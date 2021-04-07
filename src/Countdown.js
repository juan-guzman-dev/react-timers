import React, { useState, useEffect, useRef } from 'react';
import "./Countdown.css";


const Countdown = () => {
    const INITIAL_STATE = {
        timerOn: false, // boolean value for if the timer is on
        timerStart: 0, // the Unix Epoch (ms after 1970) time when the timer was started (or the past projected start time if the timer is resumed)
        timerTime: 0 // total time (ms) that the timer has been running since start/reset
    };

    const [timer, setTimer] = useState(INITIAL_STATE);
    const timerId = useRef()
    const { timerTime, timerStart, timerOn } = timer;

    useEffect(() => {
        /* Run timer if timerOn is true */
        if (timerOn) {
            timerId.current = setInterval(() => {
                const newTime = timerTime - 10;
                if (newTime >= 0) {
                    setTimer(timer => {
                        return {
                            ...timer,
                            timerTime: newTime
                        }
                    })
                } else {
                    clearInterval(timerId.current)
                    setTimer(timer => {
                        return {
                            ...timer,
                            timerOn: false
                        }
                    })
                    alert("Countdown ended")
                }
            }, 10);
        }
        return () => {
            clearInterval(timerId.current)
        }
    })

    const startTimer = () => {
        if (timerTime === 0) {
            alert("set up your timer")
            return
        }
        setTimer(timer => {
            return {
                ...timer,
                timerOn: true,
                timerTime: timer.timerTime,
                timerStart: timer.timerTime
            }
        });
    };

    const stopTimer = () => {
        clearInterval(timerId.current);
        setTimer(timer => {
            return {
                ...timer,
                timerOn: false
            }
        });
    };

    const resetTimer = () => {
        if (timerOn === false) {
            setTimer(timer => {
                return {
                    ...timer,
                    timerTime: timer.timerStart
                }
            });
        }
    };

    const adjustTimer = input => {
        const max = 216000000;
        if (!timerOn) {
            if (input === "incHours" && timerTime + 3600000 < max) {
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: timerTime + 3600000
                    }
                });
            } else if (input === "decHours" && timerTime - 3600000 >= 0) {
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: timerTime - 3600000
                    }
                });
            } else if (input === "incMinutes" && timerTime + 60000 < max) {
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: timerTime + 60000
                    }
                });
            } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: timerTime - 60000
                    }
                });
            } else if (input === "incSeconds" && timerTime + 1000 < max) {
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: timerTime + 1000
                    }
                });
            } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
                setTimer(timer => {
                    return {
                        ...timer,
                        timerTime: timerTime - 1000
                    }
                });
            }
        }
    }

    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60) % 60).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000) % 60).slice(-2);

    return (
        <div className="Countdown">
            <div className="Countdown-header">Countdown</div>
            <div className="Countdown-label">Hours : Minutes : Seconds</div>
            <div className="Countdown-display">
                <button onClick={() => adjustTimer("incHours")}>&#8679;</button>
                <button onClick={() => adjustTimer("incMinutes")}>&#8679;</button>
                <button onClick={() => adjustTimer("incSeconds")}>&#8679;</button>

                <div className="Countdown-time">
                    {hours} : {minutes} : {seconds}
                </div>

                <button onClick={() => adjustTimer("decHours")}>&#8681;</button>
                <button onClick={() => adjustTimer("decMinutes")}>&#8681;</button>
                <button onClick={() => adjustTimer("decSeconds")}>&#8681;</button>
            </div>

            {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
                <button className="Button-start" onClick={startTimer}>
                    Start
                </button>
            )}
            {timerOn === true && timerTime >= 1000 && (
                <button className="Button-stop" onClick={stopTimer}>
                    Stop
                </button>
            )}
            {timerOn === false &&
                (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                    <button className="Button-start" onClick={startTimer}>
                        Resume
                    </button>
                )}

            {(timerOn === false || timerTime < 1000) &&
                (timerStart !== timerTime && timerStart > 0) && (
                    <button className="Button-reset" onClick={resetTimer}>
                        Reset
                    </button>
                )}
        </div>
    );
}


export default Countdown;