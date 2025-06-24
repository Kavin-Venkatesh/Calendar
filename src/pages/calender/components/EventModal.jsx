// components/EventModal.jsx
import Modal from "../../../components/modal/modal";

//import styles
import styles from './views/eventModal.module.css';

const EventModal = ({ isOpen, onClose, onConfirm, eventData, setEventData, selectedDate }) => {
  return (
    <Modal
      isOpen={isOpen}
      title={`Add Event - ${selectedDate?.day} / ${selectedDate?.month + 1} / ${selectedDate?.year}`}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className={styles.evenModalInputContainer}>  
        <h5> Event Title :</h5>
         <input
        className={styles.eventModalInput}
        type="text"
        placeholder="Event Title"
        value={eventData.title}
        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        required
        />

      </div>


      <div className={styles.evenModalInputContainer}>  
        <h5> Event Start Time :</h5>
        <input
          className={styles.eventModalInput}
          type="time"
          value={eventData.startTime}
          onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
        />
      </div>

      <div className={styles.evenModalInputContainer}>
          <h5> Event End Time :</h5>
          <input
          className={styles.eventModalInput}
          type="time"
          value={eventData.endTime}
          onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
        />
      </div>

      <div className={styles.evenModalInputContainer}>
            <h5>Event Mode :</h5>
            <select
            className={styles.eventModalInput}
            value={eventData.mode}
            onChange={(e) => setEventData({ ...eventData, mode: e.target.value })}
           >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

      </div>

        {eventData.mode === "offline" && (
        <div className={styles.evenModalInputContainer}>
          <h5> Location :</h5>
          <input
          type="text"
          className={styles.eventModalInput}
          placeholder="Location"
          value={eventData.location}
          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
        />
        </div>
      )}
    </Modal>
  );
};

export default EventModal;
