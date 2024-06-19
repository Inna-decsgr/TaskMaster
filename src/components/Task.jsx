import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import Tasks from './Tasks';

export default function Task({ filter }) {
  const [tasks, setTasks] = useState(() => readTasksFromLocalstorage());

  const handleAdd = (task) => {
    setTasks([
      ...tasks,
      task
    ])
  }

  const handleUpdate = (updated) => {
    setTasks(tasks.map((t) => t.id === updated.id ? updated : t))
  };
  const handleDelete = (deleted) => {
    setTasks(tasks.filter((t) => t.id !== deleted))
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);


  let content = null;

  switch (filter) {
    case '할 일':
      content = (
        <AddTask
          tasks={tasks}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      );
      break;
    case '진행 중':
      content = (
        <Tasks
          tasks={tasks}
          filter={'진행 중'}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      );
      break;
    case '완료':
      content = (
        <Tasks
          tasks={tasks}
          filter={'완료'}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      );
    break;
  }

  return (
    <div>
      {content}
    </div>
  );
}

function readTasksFromLocalstorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : []
}


