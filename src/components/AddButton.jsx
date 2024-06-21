import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useDebounce from '../hooks/debounce';

export default function AddButton({ onAdd }) {
  const [text, setText] = useState('');
  
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const debouncedText = useDebounce(text, 200);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(debouncedText.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text:debouncedText, status: '할일' });
    setText('');
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex items-center'>
        <input
          type="text"
          placeholder='새로운 할 일'
          value={text}
          onChange={handleChange}
          className='flex-grow border border-gray-200 p-1 pl-2 outline-none rounded-bl-md'
        />
        <button className='bg-red-100 p-1 rounded-br-md hover:bg-red-200'>추가</button>
      </form>
    </div>
  );
}

