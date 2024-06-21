import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import Tasks from './Tasks';
import { useRecoilState } from 'recoil';
import { tasksState } from '../atoms';

export default function Task({ filter }) {
  const [tasks, setTasks] = useRecoilState(tasksState);
  
  const handleAdd = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks)
  }
  const handleUpdate = (updated) => {
    const updatedTasks = tasks.map((t) => (t.id === updated.id ? updated : t));
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks)
  };
  const handleDelete = (deleted) => {
    const updatedTasks = tasks.filter((t) => t.id !== deleted);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };
  const handleEdit = (edited) => {
    if (edited) {
      const updatedTasks = tasks.map((t) => t.id === edited.id ? edited : t);
      setTasks(updatedTasks);
      updateLocalStorage(updatedTasks);
    }
  }

  const updateLocalStorage = (updateTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updateTasks))
  }

  useEffect(() => {
    updateLocalStorage(tasks)
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
          onEdit={handleEdit}
          change={true}
        />
      );
      break;
    case '진행 중':
      content = (
        <Tasks
          tasks={tasks}
          filter={'진행 중'}
          onUpdate={handleUpdate}
          color={'yellow'}
          date={true}
        />
      );
      break;
    case '완료':
      content = (
        <Tasks
          tasks={tasks}
          filter={'완료'}
          onUpdate={handleUpdate}
          color={'green'}
        />
      );
      break;
    default:
      content = null;
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


