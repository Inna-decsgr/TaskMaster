import './App.css';
import React from 'react';
import TaskContainer from './components/TaskContainer';
import Header from './components/Header';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <TaskContainer />
    </DarkModeProvider>
  );
}

export default App;
