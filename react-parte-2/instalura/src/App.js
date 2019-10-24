import React from 'react';
import Header from './layout/Header';
import Timeline from './layout/Timeline';

function App({ params: { user } }) {
  return (
    <div id="root">
      <div className="main">
        <Header />
        <Timeline user={user} />
      </div>
    </div>
  );
}

export default App;
