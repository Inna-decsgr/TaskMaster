import React from 'react';
import AddButton from './AddButton';
import Todo from './Todo';

export default function AddTask({ tasks, onUpdate, onAdd, onDelete }) {
  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
  }

  return (
    <section>
      <h2>할 일</h2>
      <ul>
        {
          tasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              task={item.text}
              onUpdate={handleStatusUpdate}
              status={item.status}
              onDelete={onDelete}
            />
          )
        }
      </ul>
      <AddButton onAdd={onAdd}/>
    </section>
  );
}



