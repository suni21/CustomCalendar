import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

const CalendarDays = ({ currentMonth }) => {
  const dateFormat = 'eee';
  const days = [];
  let startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="text-center py-2" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }
  return <div className="grid grid-cols-7">{days}</div>;
};

export default CalendarDays;
