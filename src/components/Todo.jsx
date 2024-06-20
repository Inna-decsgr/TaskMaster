import React, { useEffect, useRef, useState } from 'react';
import { FaPenFancy } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";


export default function Todo({ id, task, status, onUpdate, onDelete, change }) {

  const handleChange = (e) => {
    const newStatus = e.target.checked ? '완료' : '진행 중';
    onUpdate({id, text: task, status:newStatus})
  }
  return (
    <div className={`flex items-center my-3 ${change ? 'justify-between' : ''}`}>
      <div>
        <input 
          id={id}
          type="checkbox"
          onChange={handleChange}
          checked={status === '완료'}
        />
        <label htmlFor={id} className='ml-2'>{task}</label>
      </div>
      {change && (
      <span className='flex gap-2'>
        <button className='hover:bg-white p-1'><FaPenFancy /></button>
        <button className='hover:bg-white p-1' onClick={() => onDelete(id)}><BsTrash /></button>
      </span>
      )}
    </div>

    
  );
}