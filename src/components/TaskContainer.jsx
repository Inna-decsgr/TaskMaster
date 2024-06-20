import React from 'react';
import Task from './Task';

const filters = ['할 일', '진행 중', '완료']

export default function TaskContainer() {
  return (
    <section>
      <ul className='flex flex-col gap-12 md:flex-row md:gap-24'>
        {
          filters.map((filter, index) => (
            <li key={index}>
              <Task filter={filter}/>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

