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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='새로운 할일'
          value={text}
          onChange={handleChange}
        />
        <button>추가</button>
      </form>
    </div>
  );
}

