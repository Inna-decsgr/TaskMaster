import React, { useState } from 'react';
import { FaPenFancy } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineRollback } from 'react-icons/ai';
import useDebounce from '../hooks/debounce';

export default function Todo({ id, task, status, onUpdate, onDelete, onEdit, change }) {
  const [newText, setNewText] = useState('');
  const [edit, setEdit] = useState(false);

  const updateText = (e) => {
    setNewText(e.target.value);
  }

  const editedText = useDebounce(newText, 300);

  const handleChange = (e) => {
    const newStatus = e.target.checked ? '완료' : '진행 중';
    onUpdate({id, text: task, status:newStatus})
  }
  const handleEdit = () => {
    setEdit(!edit);
  }
  const handleStorage = (edit) => {
    if (editedText.trim().length !== 0) {
      onEdit({
        id,
        status,
        text: editedText
      })
    } else {
      setEdit(!edit)
    }
    setEdit(!edit)
  }


  return (
    <div className={`flex items-center my-3 ${change ? 'justify-between' : ''}`}>
      {
        edit ? (
          <>
            <form onSubmit={handleStorage}>
              <input
                type="text"
                onChange={updateText}
              />
            </form>
            {change && (
            <span className='flex gap-2'>
                <button className='hover:bg-white p-1' type='button' onClick={handleStorage}>
                  <FaCheckCircle />
                </button>
                <button className='hover:bg-white p-1' type='button' onClick={() => setEdit(!edit)}>
                  <AiOutlineRollback />
                </button>
            </span>
          )}
          </>
        ) : (
        <>
          <div className='text-sm md:text-base'>
            <input 
              id={id}
              type="checkbox"
              onChange={handleChange}
              checked={status === '완료'}
            />
            <label htmlFor={id} className={`ml-2 ${status === '완료' ? 'line-through' : ''}`}>{task}</label>
          </div>
          {change && (
            <span className='flex gap-2'>
              <button className='hover:bg-white p-1' onClick={handleEdit}><FaPenFancy /></button>
              <button className='hover:bg-white p-1' onClick={() => onDelete(id)}><BsTrash /></button>
            </span>
          )}
        </>
        )
      }
    </div>
  );
}