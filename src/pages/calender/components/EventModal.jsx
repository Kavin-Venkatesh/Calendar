import React, { useState, useEffect } from "react";
import Modal from "../../../components/modal/modal";
import { toast } from "react-toastify";
import { useCalendar } from "../../../context/CalendarContext";
import styles from './views/eventModal.module.css';

const EventModal = () => {
  const {
    showModal,
    closeModal,
    addEvent,
    editEvent,
    selectedDate,
    isEditing,
    currentEditEvent,
    checkEventConflicts,
  } = useCalendar();

  const [eventData, setEventData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    mode: "online",
    location: "",
  });

  // Pre-fill fields when editing
  useEffect(() => {
    if (isEditing && currentEditEvent) {
      setEventData({ ...currentEditEvent });
    } else {
      setEventData({
        title: "",
        startTime: "",
        endTime: "",
        mode: "online",
        location: "",
      });
    }
  }, [isEditing, currentEditEvent]);

  const handleConfirm = () => {
    if (!eventData.title.trim()) {
      toast.error("Event title is required.");
      return;
    }

    if (!eventData.startTime || !eventData.endTime) {
      toast.warning("Start and End time must be provided.");
      return;
    }

    if (eventData.startTime >= eventData.endTime) {
      toast.error("Start time must be earlier than end time.");
      return;
    }

    if (eventData.mode === "offline" && !eventData.location.trim()) {
      toast.info("Please enter a location for offline event.");
      return;
    }

    const newEvent = {
      ...eventData,
      date: selectedDate,
      id: isEditing ? eventData.id : Date.now(),
    };

    const conflicts = checkEventConflicts(newEvent);
    if (conflicts.length > 0) {
      toast.warning(`⚠️ Time conflict with: ${conflicts.map(e => e.title).join(', ')}`);
    }

    if (isEditing) {
      editEvent(newEvent);
      toast.success("Event updated!");
    } else {
      addEvent(newEvent);
      toast.success("Event added!");
    }

    closeModal();
    
  
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
  };

  if (!showModal) return null;

  return (
    <Modal
      isOpen={showModal}
      title={`${isEditing ? "Edit" : "Add"} Event - ${selectedDate?.day}/${selectedDate?.month + 1}/${selectedDate?.year}`}
      onClose={closeModal}
      onConfirm={handleConfirm}
    >
      <div className={styles.evenModalInputContainer}>
        <h5>Event Title:</h5>
        <input
          className={styles.eventModalInput}
          type="text"
          placeholder="Event Title"
          value={eventData.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
      </div>

      <div className={styles.evenModalInputContainer}>
        <h5>Event Start Time:</h5>
        <input
          className={styles.eventModalInput}
          type="time"
          value={eventData.startTime}
          onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
        />
      </div>

      <div className={styles.evenModalInputContainer}>
        <h5>Event End Time:</h5>
        <input
          className={styles.eventModalInput}
          type="time"
          value={eventData.endTime}
          onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
        />
      </div>

      <div className={styles.evenModalInputContainer}>
        <h5>Event Mode:</h5>
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
          <h5>Location:</h5>
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
