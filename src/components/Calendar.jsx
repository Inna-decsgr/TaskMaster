import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineNavigateBefore, MdNavigateNext } from "react-icons/md";

const YEARS = Array.from({ length: getYear(new Date()) + 1 - 2000 }, (_, i) => getYear(new Date()) - i);
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const Calendar = ({ id, selectedDate, setSelectedDate }) => {
  const localStoragekey = `fixedSelectedDate_${id}`;

  const [fixedDate, setFixedDate] = useState(null);

  useEffect(() => {
    const storedDate = localStorage.getItem(localStoragekey);
    if (storedDate) {
      setFixedDate(new Date(storedDate))
    }
  },[localStoragekey])

  const handleCheck = (date) => {
    if (date) {
      localStorage.setItem(localStoragekey, date.toISOString());
      setFixedDate(date);
    }
    setSelectedDate(date);
  }

  return (
    <div className='w-full max-w-xs mx-auto'>
      <DatePicker
        dateFormat='yyyy.MM.dd'
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        shouldCloseOnSelect={true}
        yearDropdownItemNumber={100}
        minDate={new Date('2020-01-01')}
        selected={fixedDate || selectedDate}
        dayClassName={(d) => (d.getDate() === (selectedDate ? selectedDate.getDate() : 0) ? 'bg-orange-500 rounded-full text-white' : 'hover:bg-gray-200')}
        onChange={(date) => handleCheck(date)}
        className="flex items-center w-28 h-8 border border-gray-300 rounded-md px-4 dark:text-black"
        renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div>
            <div>
              <span>{MONTHS[getMonth(date)]}</span>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option} className='bg-black text-white'>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type='button'
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <MdOutlineNavigateBefore />
              </button>
              <button
                type='button'
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

