import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import Modal from 'react-modal'; // Import Modal for event details pop-up

const CalendarCells = ({ currentMonth, selectedDate, onDateClick, events, openModal, checkRecurringEvent, eventTypeColors }) => {
  const [selectedEvent, setSelectedEvent] = useState(null); // State to manage selected event for details pop-up

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const today = new Date();

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const openEventDetails = event => {
    setSelectedEvent(event); // Set selected event for details pop-up
  };

  const closeModal = () => {
    setSelectedEvent(null); // Close details pop-up
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      const dayEvents = events.filter(event => isSameDay(event.date, day) || checkRecurringEvent(event, day));
      days.push(
        <div
          className={`rounded-lg px-4 py-2 text-center ${!isSameMonth(day, monthStart) ? 'text-gray-400' : isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : isSameDay(day, today) ? 'bg-green-500 text-white' : 'text-white'}`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span>{formattedDate}</span>
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className={`mt-2 rounded-md ${eventTypeColors[event.type]}`}
              style={{ padding: '4px', fontSize: '14px' }}
              onClick={() => openEventDetails(event)} // Open event details pop-up on click
            >
              {event.title}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div>
      {rows}
      <EventDetailsModal event={selectedEvent} closeModal={closeModal} /> {/* Render EventDetailsModal */}
    </div>
  );
};

const EventDetailsModal = ({ event, closeModal }) => {
  return (
    <Modal isOpen={!!event} onRequestClose={closeModal} contentLabel="Event Details">
      {event && (
        <div>
          <h2 className="text-lg font-bold mb-2">{event.title}</h2>
          <p className="mb-2">Type: {event.type}</p>
          <p className="mb-2">Date: {format(event.date, 'LLLL')}</p>
          <p className="mb-2">Description: {event.description}</p>
          {/* Add more event details as needed */}
          <button onClick={closeModal} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      )}
    </Modal>
  );
};

export default CalendarCells;
