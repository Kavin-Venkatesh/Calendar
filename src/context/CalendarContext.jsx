import { createContext, useContext, useState, useEffect } from "react";
import { findConflicts } from "../utils/conflictDetection";

// 1. Create the context
const CalendarContext = createContext();

// 2. Hook for using the context
export const useCalendar = () => useContext(CalendarContext);

// 3. Load from localStorage
const getInitialEvents = () => {
  const stored = localStorage.getItem("calendar-events");
  return stored ? JSON.parse(stored) : [];
};

// 4. Provider component
export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState(getInitialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditEvent, setCurrentEditEvent] = useState(null);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  // 5. Add new event
  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  // 6. Edit existing event
  const editEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  };

  // 7. Delete event
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // 8. Select date & fetch events for that day
  const selectDate = (dateObj) => {
    setSelectedDate(dateObj);
    const matchedEvents = events.filter(
      (e) =>
        e.date?.day === dateObj.day &&
        e.date?.month === dateObj.month &&
        e.date?.year === dateObj.year
    );
    setSelectedEvents(matchedEvents);
  };

  // 8.1. Simple conflict check
  const checkEventConflicts = (eventToCheck) => {
    return findConflicts(eventToCheck, events);
  };

  // 9. Modal actions
  const openAddModal = (date) => {
    setSelectedDate(date);
    setIsEditing(false);
    setCurrentEditEvent(null);
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setSelectedDate(event.date);
    setCurrentEditEvent(event);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEditEvent(null);
    setIsEditing(false);
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,

        selectedDate,
        setSelectedDate,

        selectedEvents,
        setSelectedEvents,
        selectDate,
        
        checkEventConflicts,

        showModal,
        openAddModal,
        openEditModal,
        closeModal,

        isEditing,
        currentEditEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};


