import React from 'react';

export default function Todo({ id, task, status, onUpdate, onDelete }) {
  const handleChange = (e) => {
    const newStatus = e.target.checked ? '완료' : '진행 중';
    onUpdate({id, text: task, status:newStatus})
  }
  

  return (
    <>
      <input 
        id={id}
        type="checkbox"
        onChange={handleChange}
        checked={status === '완료'}
      />
      <label htmlFor={id}>{task}</label>
      <span>
        <button>수정</button>
        <button onClick={() => onDelete(id)}>삭제</button>
      </span>
    </>
  );
}

