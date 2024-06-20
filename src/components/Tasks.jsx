import React from 'react';
import Todo from './Todo';

export default function Tasks({tasks, filter, onUpdate, change, style}) {
  function filterTasksByStatus(tasks, statusFilter) {
    return tasks.filter(task => task.status === statusFilter);
  }

  const filteredTasks = filterTasksByStatus(tasks, filter);

  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }


  return (
    <section>
      <div className={`flex justify-center items-center bg-${style}-100 w-24 rounded-lg mb-4`}>
        <div className={`relative w-2 h-2 before:block before:w-2 before:h-2 before:absolute before:top-0 before:left-0 rounded-full bg-${style}-400`} />
        <h2 className='ml-3 font-bold'>{filter}</h2>
      </div>
      <div className='w-72 h-72 border rounded-md p-2 bg-gray-50'>
        {
          filteredTasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              filter={filter}
              task={item.text}
              onUpdate={handleStatusUpdate}
              status={item.status}
              change={change}
            />
          )
        }
      </div>
    </section>
  );
}

