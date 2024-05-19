// Import necessary libraries and components
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { addMonths, subMonths, addYears, subYears, parseISO, isSameDay } from 'date-fns';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Modal from 'react-modal'; // Add Modal import for event details pop-up

import CalendarHeader from './components/CalendarHeader';
import CalendarDays from './components/CalendarDays';
import CalendarCells from './components/CalendarCells';
import EventModal from './components/EventModal'; // Event Modal for detailed pop-up
import AddEventModal from './components/AddEventModal';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

const eventTypeColors = {
  meeting: 'bg-blue-500',
  appointment: 'bg-green-400',
  reminder: 'bg-yellow-400',
  birthday: 'bg-pink-400',
  holiday: 'bg-red-400',
  task: 'bg-purple-400'
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'meeting',
    date: '',
    recurring: null,
    description: ''
  });

  const onDateClick = day => {
    setSelectedDate(day);
    setModalIsOpen(true);
  };

  const addEvent = () => {
    setModalIsOpen(false);
    const newEventWithDate = { ...newEvent, date: selectedDate };
    setEvents(prevEvents => [...prevEvents, newEventWithDate]);
    setNewEvent({
      title: '',
      type: 'meeting',
      date: '',
      recurring: null,
      description: ''
    });
  };

    // Function to handle editing an event
    const editEvent = (updatedEvent) => {
      const updatedEvents = events.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setModalIsOpen(false);
    };
  
    // Function to handle deleting an event
    const deleteEvent = () => {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setModalIsOpen(false);
    };

  const openEventDetails = event => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextYear = () => {
    setCurrentMonth(addYears(currentMonth, 1));
  };
  const prevYear = () => {
    setCurrentMonth(subYears(currentMonth, 1));
  };

  const onDragEnd = result => {
    // Your existing code for dragging events
  };

  const openModal = event => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 

  const checkRecurringEvent = (event, day) => {
    if (!event.recurring) return false;
    const eventDate = parseISO(event.date);
    switch (event.recurring) {
      case 'daily':
        return isAfter(day, eventDate) || isSameDay(day, eventDate);
      case 'weekly':
        return getDay(day) === getDay(eventDate) && (isAfter(day, eventDate) || isSameDay(day, eventDate));
      case 'monthly':
        return day.getDate() === eventDate.getDate() && (isAfter(day, eventDate) || isSameDay(day, eventDate));
      case 'yearly':
        return day.getDate() === eventDate.getDate() && day.getMonth() === eventDate.getMonth() && (isAfter(day, eventDate) || isSameDay(day, eventDate));
      default:
        return false;
    }
  };

   return (
    <div className="p-4">
      <CalendarHeader 
        currentMonth={currentMonth} 
        prevMonth={prevMonth} 
        nextMonth={nextMonth} 
        prevYear={prevYear} 
        nextYear={nextYear} 
      />
      <CalendarDays currentMonth={currentMonth} />
      <CalendarCells 
        currentMonth={currentMonth} 
        selectedDate={selectedDate} 
        onDateClick={onDateClick} 
        events={events} 
        openModal={() => setModalIsOpen(true)}
        checkRecurringEvent={checkRecurringEvent} 
        eventTypeColors={eventTypeColors}
        openEventDetails={openEventDetails}
      />
      <EventModal 
        modalIsOpen={modalIsOpen} 
        closeModal={() => setModalIsOpen(false)} 
        selectedEvent={selectedEvent} 
        deleteEvent={deleteEvent}
        editEvent={editEvent} // Pass editEvent function to EventModal
      />
      <AddEventModal 
        modalIsOpen={modalIsOpen} 
        closeModal={() => setModalIsOpen(false)} 
        newEvent={newEvent} 
        handleInputChange={handleInputChange} 
        addEvent={addEvent} 
      />
    </div>
  );
};

export default Calendar;