import React from 'react';
import { FaCheck } from "react-icons/fa";
import { useDarkMode } from '../context/DarkModeContext';
import { IoBulbOutline } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className='relative flex justify-between p-4 px-10 md:px-16'>
      <div className='dark:text-text'>
        <h1 className='flex text-3xl font-bold gap-2 mb-4 md:text-6xl md:gap-4'><FaCheck />TaskMaster</h1>
        <p className='text-sm mb-8 md:text-lg md:mb-16'>TaskMaster를 사용하면 개인 작업을 기록할 수 있습니다.<br />카테고리별로 분리해서 한 눈에 작업들을 편하게 관리해보세요🤗</p>
      </div>
      <button className='absolute top-6 right-6 text-2xl sm:relative sm:top-auto sm:right-auto md:text-4xl dark:text-accent' onClick={toggleDarkMode}>
        {!darkMode && <IoBulbOutline />}
        {darkMode && <FiMoon />}
      </button>
    </header>
  );
}

