import React from 'react';
import AddButton from './AddButton';
import Todo from './Todo';

export default function AddTask({ tasks, onUpdate, onAdd, onDelete, change }) {
  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }


  return (
    <section>
      <div className='flex justify-center items-center bg-red-100 w-24 rounded-lg mb-4'>
        <div className='relative w-2 h-2 before:block before:w-2 before:h-2 before:absolute before:top-0 before:left-0 rounded-full bg-red-400'></div>
        <h2 className='ml-3 font-bold'>할 일</h2>
      </div>
      <div className='w-72 h-72 border rounded-md p-2 bg-gray-50'>
        <h2 className='text-2xl font-bold'>Tasks</h2>

        {
          tasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              task={item.text}
              onUpdate={handleStatusUpdate}
              status={item.status}
              onDelete={onDelete}
              change={change}
            />
          )
        }
      </div>
      <AddButton onAdd={onAdd}/>
    </section>
  );
}



