import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const [facingMode, setFacingMode] = useState('user');
  const [clickCount, setClickCount] = useState(0);
  const [showText, setShowText] = useState(false);
  const videoConstraints = {
    facingMode: facingMode
  };

  useEffect(() => {
    if (clickCount === 3) {
      setFacingMode(prevState => prevState === 'user' ? 'environment' : 'user');
      setClickCount(0);
      setShowText(true);
      setTimeout(() => setShowText(false), 2000);
    }
  }, [clickCount]);

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', margin: 0, padding: 0, backgroundColor: 'black'}} onClick={() => setClickCount(prevCount => prevCount + 1)}>
      {showText && <div style={{position: 'absolute', top: '10px', right: '10px', zIndex: 1, color: 'white'}}>Switched Camera</div>}
      <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{
          transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
          width: '50vw',
          height: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Webcam videoConstraints={videoConstraints} style={{
            width: '120%',
            height: '120%',
            transform: 'translateX(-10%) translateY(-10%) scale(0.833)',
            position: 'absolute'
          }} />
        </div>
      </div>
      <div style={{flex: 1}}>
        <div style={{
          width: '50vw',
          height: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Webcam videoConstraints={videoConstraints} style={{
            width: '120%',
            height: '120%',
            transform: 'translateX(-10%) translateY(-10%) scale(0.833)',
            position: 'absolute'
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;