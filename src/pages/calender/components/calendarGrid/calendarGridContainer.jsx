import React , {useState , useEffect } from 'react';

import styles from './views/calendarGrid.module.css';
import EventModal from '../EventModal';
import { toast } from "react-toastify";


const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const CalendarGridContainer = ({ month, year }) => {

  const [showModal , setShowModal] =  useState(false);
  const [selectedDate , setSelectedDate ] = useState(null);
  const [events , setEvents] = useState([]);
  const [newEvent , setNewEvent] = useState({
    title : "",
    startTime :  "",
    endTime : "",
    mode : 'online',
    location : ""
  });

  useEffect(() => {
    const stored = localStorage.getItem("calendar-events");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  const openModal = (day) =>{
    setSelectedDate({ day , month , year });
    setShowModal(true);
  };

  const closeModal = () =>{
    setShowModal(false);
    setNewEvent({
      title : "",
      startTime :  "",
      endTime : "",
      mode : 'online',
      location : ""
    });
  };

  const handleConfrimEventCreation = () =>{
     if (!newEvent.title.trim()) {
        toast.error("Event title is required.");
        return;
      }

      if (!newEvent.startTime || !newEvent.endTime) {
        toast.warning("Start and End time must be provided.");
        return;
      }

      if (newEvent.startTime >= newEvent.endTime) {
        toast.error("Start time must be earlier than end time.");
        return;
      }

      if (newEvent.mode === "offline" && !newEvent.location.trim()) {
        toast.info("Please enter a location for offline event.");
        return;
      }

      const newEntry = { ...newEvent, date: selectedDate };
      const updatedEvents = [...events, newEntry];

      setEvents(updatedEvents);
      localStorage.setItem("calendar-events", JSON.stringify(updatedEvents));

      toast.success("Event added successfully!");
      closeModal();
  }


  const today = new Date();
  const currentDate = today.getDate();
  const isToday = (dayNum) =>
    dayNum === currentDate &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const startDay = (startOfMonth.getDay() + 6) % 7; // Adjust so week starts on Monday
  const daysInMonth = endOfMonth.getDate();
  const totalCells = startDay + daysInMonth;
  const rows = Math.ceil(totalCells / 7) * 7;

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < rows; i++) {
      const dayNum = i - startDay + 1;
      const isCurrentDay = isToday(dayNum);

      cells.push(
        <div
          key={i}
          className={`${styles.calendarCells} ${isCurrentDay ? styles.today : ''}`}
          onClick={() => dayNum > 0 && dayNum <= daysInMonth && openModal(dayNum)}
        >
          <div className={styles.cellDate}>
            {dayNum > 0 && dayNum <= daysInMonth ? dayNum : ''}
          </div>

          {events
            .filter((e) => e.date?.day === dayNum && e.date?.month === month && e.date?.year === year)
            .map((event, idx) => (
              <div key={idx} className={styles.eventContainer}>
                <p className={styles.eventName}>{event.title}</p>
              </div>
            ))}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className={styles.calendarGrid}>
      {daysOfWeek.map((day) => (
        <div key={day} className={styles.dayHeader}>
          {day}
        </div>
      ))}
      {renderCells()}

      <EventModal 
        isOpen={showModal}
        onClose = {closeModal}
        onConfirm={handleConfrimEventCreation}
        eventData={newEvent}
        setEventData={setNewEvent}
        selectedDate={selectedDate}
     />
    </div>
  );
};

export default CalendarGridContainer;
