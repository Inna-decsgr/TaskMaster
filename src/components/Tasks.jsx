import React from 'react';
import Todo from './Todo';

export default function Tasks({tasks, filter, onUpdate, change, color, date}) {
  function filterTasksByStatus(tasks, statusFilter) {
    return tasks.filter(task => task.status === statusFilter);
  }

  const filteredTasks = filterTasksByStatus(tasks, filter);

  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }

  return (
    <section>
      <div className='flex'>
        <div className={`flex justify-center items-center ${color === 'yellow' ? 'bg-yellow-100' : 'bg-green-100'} w-24 rounded-lg mb-4`}>
        <div className={`relative w-2 h-2 before:block before:w-2 before:h-2 before:absolute before:top-0 before:left-0 rounded-full ${color === 'yellow' ? 'bg-yellow-400' : 'bg-green-400'}`} />
          <h2 className='text-sm md:text-base ml-3 font-bold'>{filter}</h2>
        </div>
        <span className='text-sm md:text-base ml-4 text-gray-400 font-bold dark:text-text-gray'>{filteredTasks.length}</span>
      </div>
      <div className='w-80 h-80 border rounded-md p-2 bg-gray-100 overflow-y-auto dark:bg-bg-task-dark dark:border-none'>
        {date && <span className='ml-[200px] dark:text-text'>* 목표 기한 *</span>}
        <div>
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
                date={date}
              />
            )
          }
        </div>
      </div>
    </section>
  );
}

