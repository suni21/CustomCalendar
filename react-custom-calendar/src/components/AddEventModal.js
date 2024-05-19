import React from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

const AddEventModal = ({ modalIsOpen, closeModal, newEvent, handleInputChange, addEvent }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add Event">
      <h2>Add Event</h2>
      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Type:</label>
          <select
            name="type"
            value={newEvent.type}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="meeting">Meeting</option>
            <option value="appointment">Appointment</option>
            <option value="reminder">Reminder</option>
            <option value="birthday">Birthday</option>
            <option value="holiday">Holiday</option>
            <option value="task">Task</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description:</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button onClick={addEvent} className="px-4 py-2 bg-blue-500 text-white rounded">Add Event</button>
        <button onClick={closeModal} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
