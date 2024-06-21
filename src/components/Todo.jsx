import React, { useEffect, useRef, useState } from 'react';
import { FaPenFancy } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineRollback } from 'react-icons/ai';
import useDebounce from '../hooks/debounce';
import { Calendar } from './Calendar';

export default function Todo({ id, task, status, onUpdate, onDelete, onEdit, change, date }) {
  const [newText, setNewText] = useState('');
  const [edit, setEdit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const updateText = (e) => {
    setNewText(e.target.value);
  }

  const debouncedText = useDebounce(newText, 200);

  const handleChange = (e) => {
    const newStatus = e.target.checked ? '완료' : '진행 중';
    onUpdate({id, text: task, status:newStatus})
  }
  const handleEdit = () => {
    setEdit(!edit);
  }
  const handleStorage = (e) => {
    e.preventDefault();
    if (debouncedText.trim().length !== 0) {
      onEdit({
        id,
        status,
        text: debouncedText
      });
      setEdit(!edit)
    } else {
      setEdit(!edit)
    }
  }

  const list = useRef(null);
  const scrollToBottom = () => {
    list.current.scrollIntoView({behavior:'smooth'})
  }
  useEffect(() => {
    scrollToBottom()
  },[task])


  return (
    <div className={`flex items-center my-3 justify-between dark:text-text`} ref={list}>
      {
        edit ? (
          <>
            <form onSubmit={handleStorage}>
              <input
                type="text"
                value={newText}
                onChange={updateText}
              />
            </form>
            {change && (
            <span className='flex gap-2'>
                <button className='p-1 dark:text-text-gray' type='button' onClick={handleStorage}>
                  <FaCheckCircle />
                </button>
                <button className='p-1 dark:text-text-gray' type='button' onClick={() => setEdit(!edit)}>
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
              <button className='p-1' onClick={handleEdit}><FaPenFancy /></button>
              <button className='p-1' onClick={() => onDelete(id)}><BsTrash /></button>
            </span>
          )}
          {date && (
            <div>
              <Calendar id={id} selectedDate={startDate} setSelectedDate={setStartDate} />
            </div>
          )}
        </>
        )
      }
    </div>
  );
}