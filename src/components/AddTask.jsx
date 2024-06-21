import React from 'react';
import AddButton from './AddButton';
import Todo from './Todo';


export default function AddTask({ tasks, onUpdate, onAdd, onDelete, onEdit, change }) {
  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }


  return (
    <section>
      <div className='flex'>
        <div className='flex justify-center items-center bg-red-100 w-24 rounded-lg mb-4'>
          <div className='relative w-2 h-2 before:block before:w-2 before:h-2 before:absolute before:top-0 before:left-0 rounded-full bg-red-400'></div>
          <h2 className='text-sm md:text-base ml-3 font-bold'>할 일</h2>
        </div>
        <span className='text-sm md:text-base ml-4 text-gray-400 font-bold dark:text-text-gray'>{tasks.length}</span>
      </div>
      <div className='w-80 h-80 border rounded-tl-md rounded-tr-md p-2 bg-gray-100 overflow-y-auto dark:bg-bg-task-dark dark:border-none'>
        <h2 className='text-2xl font-bold dark:text-text'>Tasks</h2>
        {
          tasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              task={item.text}
              status={item.status}
              onUpdate={handleStatusUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
              change={change}
            />
          )
        }
      </div>
      <AddButton onAdd={onAdd} />
    </section>
  );
}



