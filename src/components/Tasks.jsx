import React from 'react';
import Todo from './Todo';

export default function Tasks({tasks, filter, onUpdate}) {
  function filterTasksByStatus(tasks, statusFilter) {
    return tasks.filter(task => task.status === statusFilter);
  }

  const filteredTasks = filterTasksByStatus(tasks, filter);

  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
    console.log(tasks);
  }

  return (
    <section>
      <ul>
        {
          filteredTasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              filter={filter}
              task={item.text}
              onChange={handleStatusUpdate}
              status={item.status}
            />
          )
        }
      </ul>
    </section>
  );
}

