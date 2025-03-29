import React from 'react';
import AbgSimulator from './components/AbgSimulator';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <AbgSimulator />
    </div>
  );
}

export default App;
