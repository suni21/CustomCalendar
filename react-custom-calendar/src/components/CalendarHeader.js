import React from 'react';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth, prevYear, nextYear }) => {
  const monthFormat = 'MMMM';
  const yearFormat = 'yyyy';

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex items-center">
        <button onClick={prevYear} className="px-4 py-2 bg-blue-500 text-white rounded">«</button>
        <div className="text-lg font-bold"> {format(currentMonth, yearFormat)} </div>
        <button onClick={nextYear} className="px-4 py-2 bg-blue-500 text-white rounded">»</button>
      </div>
      <div className="flex items-center mt-2">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-500 text-white rounded">{'<'}</button>
        <div className="text-lg font-bold">{format(currentMonth, monthFormat)}</div>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">{'>'}</button>
      </div>
    </div>
  );
};

export default CalendarHeader;
