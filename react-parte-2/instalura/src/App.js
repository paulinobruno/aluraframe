import React from 'react';
import Header from './layout/Header';
import Timeline from './layout/Timeline';

function App() {
  return (
    <div id="root">
      <div className="main">
        <Header />
        <Timeline />
      </div>
    </div>
  );
}

export default App;
