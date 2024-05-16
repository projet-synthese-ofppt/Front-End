import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EventModal = ({ event, onClose }) => {
  // Convert start and end times to French locale strings
  const startDateStr = event.start.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const startTimeStr = event.start.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const endTimeStr = event.end.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header >
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Date: {startDateStr}</p>
          <p>L'heure: {startTimeStr} - {endTimeStr}</p>
        </div>
        {/* Add more event details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
