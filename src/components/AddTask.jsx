import React from 'react';
import AddButton from './AddButton';
import Todo from './Todo';

export default function AddTask({ tasks, onUpdate, onAdd }) {
  const handleStatusUpdate = (updatedTask) => {
    onUpdate(updatedTask)
    console.log(tasks);
  }

  return (
    <section>
      <ul>
        {
          tasks.map((item) =>
            <Todo
              key={item.id}
              id={item.id}
              task={item.text}
              onChange={handleStatusUpdate}
              status={item.status}
            />
          )
        }
      </ul>
      <AddButton onAdd={onAdd}/>
    </section>
  );
}



