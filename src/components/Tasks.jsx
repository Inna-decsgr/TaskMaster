import React from 'react';
import Todo from './Todo';

export default function Tasks({tasks, filter, onUpdate}) {
  function filterTasksByStatus(tasks, statusFilter) {
    return tasks.filter(task => task.status === statusFilter);
  }

  const filteredTasks = filterTasksByStatus(tasks, filter);

  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }

  return (
    <section>
      <h2>{filter}</h2>
      <ul>
        {
          filteredTasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              filter={filter}
              task={item.text}
              onUpdate={handleStatusUpdate}
              status={item.status}
            />
          )
        }
      </ul>
    </section>
  );
}

