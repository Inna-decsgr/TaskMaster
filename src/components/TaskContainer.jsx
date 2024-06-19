import React from 'react';
import Header from './Header';
import Task from './Task';

const filters = ['할 일', '진행 중', '완료']

export default function TaskContainer() {
  return (
    <>
      <Header filters={filters} />
      <ul>
        {
          filters.map((filter, index) => (
            <li key={index}>
              <Task filter={filter}/>
            </li>
          ))
        }
      </ul>
    </>
  );
}

