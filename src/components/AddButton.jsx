import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AddButton({ onAdd }) {
  const [text, setText] = useState('');
  
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return
    }
    onAdd({ id: uuidv4(), text, status: '할일' });
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
          className='flex-grow border border-gray-300 p-1 pl-2'
        />
        <button className='border p-1'>추가</button>
      </form>
    </div>
  );
}

