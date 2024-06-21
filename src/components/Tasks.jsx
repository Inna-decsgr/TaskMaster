import React from 'react';
import Todo from './Todo';

export default function Tasks({tasks, filter, onUpdate, onDelete, onEdit, change, color, date}) {
  function filterTasksByStatus(tasks, statusFilter) {
    switch (statusFilter) {
    case '할 일':
      return tasks;
    case '진행 중':
      return tasks.filter(task => task.status === '진행 중');
    case '완료':
      return tasks.filter(task => task.status === '완료');
    default:
      return tasks;
  }
  }

  const filteredTasks = filterTasksByStatus(tasks, filter);

  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }

  let colorClass;
  let circleColorClass;
  switch (color) {
    case 'red':
      colorClass = 'bg-red-100';
      circleColorClass = 'bg-red-400';
      break;
    case 'yellow':
      colorClass = 'bg-yellow-100';
      circleColorClass = 'bg-yellow-400';
      break;
    case 'green':
      colorClass = 'bg-green-100';
      circleColorClass = 'bg-green-400';
      break;
    default:
      colorClass = 'bg-gray-100'; 
      circleColorClass = 'bg-gray-400'; 
      break;
  }


  return (
    <section>
      <div className='flex'>
        <div className={`flex justify-center items-center ${colorClass} w-24 rounded-lg mb-4`}>
        <div className={`relative w-2 h-2 before:block before:w-2 before:h-2 before:absolute before:top-0 before:left-0 rounded-full ${circleColorClass}`} />
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
                onDelete={onDelete}
                onEdit={onEdit}
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

