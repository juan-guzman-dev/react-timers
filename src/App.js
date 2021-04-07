import React from 'react';
import './App.css';
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
import UserForm from './UserForm';

function App() {
  return (
    <div className="App">
      <div className="App-title">Timers Demo</div>
      <div className="Timers">
        <Stopwatch />
        <Countdown />
        {/* <UserForm /> */}
      </div>

    </div>
  );
}

export default App;
