import React from 'react';

export default function Header({filters}) {
  return (
    <>
      <ul>
        {filters.map((filter, index) => (
          <li key={index} className='font-bold'>
            {filter}
          </li>
        ))}
      </ul>
    </>
  );
}

