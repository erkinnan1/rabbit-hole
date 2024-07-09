import React from 'react';
import RabbitHole from './components/RabbitHole';
import { LearningProvider } from './contexts/LearningContext';
import './App.css';

function App() {
  return (
    <LearningProvider>
      <div className="App">
        <header className="App-header">
          <h1>Rabbithole.ai</h1>
        </header>
        <main>
          <RabbitHole />
        </main>
      </div>
    </LearningProvider>
  );
}

export default App;