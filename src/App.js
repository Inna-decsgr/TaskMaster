import './App.css';
import React from 'react';
import TaskContainer from './components/TaskContainer';


function App() {

  return (
    <div>
      <h1>TaskMaster</h1>
      <p>TaskMaster를 사용하면 개인 작업을 기록할 수 있습니다.</p>
      <TaskContainer />
    </div>
  );
}

export default App;
