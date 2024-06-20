import './App.css';
import React from 'react';
import TaskContainer from './components/TaskContainer';
import { FaCheck } from "react-icons/fa";

function App() {

  return (
    <div>
      <h1 className='flex items-center text-6xl font-bold mb-4 gap-4'><FaCheck />TaskMaster</h1>
      <p className='text-lg mb-16'>TaskMaster를 사용하면 개인 작업을 기록할 수 있습니다.<br />카테고리별로 분리해서 한 눈에 작업들을 편하게 관리해보세요🤗</p>
      <div className='flex'>
        <TaskContainer />
      </div>
    </div>
  );
}

export default App;
