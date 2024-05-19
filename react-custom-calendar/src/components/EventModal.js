import React from 'react';
import Modal from 'react-modal';
import dayjs from 'dayjs';

const EventModal = ({ modalIsOpen, closeModal, selectedEvent, deleteEvent }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Event Details">
      {selectedEvent && (
        <div>
          <h2 className="text-lg font-bold mb-2">{selectedEvent.title}</h2>
          <p className="mb-2">Type: {selectedEvent.type}</p>
          <p className="mb-2">Date: {dayjs(selectedEvent.date).format('LLLL')}</p>
          <p className="mb-2">Description: {selectedEvent.description}</p>
          <button onClick={() => deleteEvent(selectedEvent.id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete Event</button>

          <button onClick={closeModal} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      )}
    </Modal>
  );
};

export default EventModal;
