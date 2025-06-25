// components/CalendarGridContainer.jsx
import styles from "./views/calendarGrid.module.css";
import EventModal from "../EventModal";
import { useCalendar } from "../../../../context/CalendarContext";
import { findConflicts } from "../../../../utils/conflictDetection";

const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const CalendarGridContainer = ({ month, year }) => {
  const {
    events,
    selectedDate,
    showModal,
    openAddModal,
    closeModal,
    addEvent,
    selectDate,
  } = useCalendar();

  const today = new Date();
  const currentDate = today.getDate();
  const isToday = (dayNum) =>
    dayNum === currentDate &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const startDay = (startOfMonth.getDay() + 6) % 7; // Monday start
  const daysInMonth = endOfMonth.getDate();
  const totalCells = startDay + daysInMonth;
  const rows = Math.ceil(totalCells / 7) * 7;

  const handleCellClick = (day) => {
    const dateObj = { day, month, year };
    const hasEvent = events.some(
      (e) =>
        e.date?.day === day &&
        e.date?.month === month &&
        e.date?.year === year
    );

    selectDate(dateObj);

    if (!hasEvent) {
      openAddModal(dateObj);
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < rows; i++) {
      const dayNum = i - startDay + 1;
      const isCurrentDay = isToday(dayNum);

      cells.push(
        <div
          key={i}
          className={`${styles.calendarCells} ${
            isCurrentDay ? styles.today : ""
          }`}
          onClick={() => dayNum > 0 && dayNum <= daysInMonth && handleCellClick(dayNum)}
        >
          <div className={styles.cellDate}>
            {dayNum > 0 && dayNum <= daysInMonth ? dayNum : ""}
          </div>

          {events
            .filter(
              (e) =>
                e.date?.day === dayNum &&
                e.date?.month === month &&
                e.date?.year === year
            )
            .map((event, idx) => {
              const conflicts = findConflicts(event, events);
              const hasConflict = conflicts.length > 0;
              
              return (
                <div 
                  key={idx} 
                  className={`${styles.eventContainer} ${hasConflict ? styles.conflictEvent : ''}`}
                  title={hasConflict ? `⚠️ Conflicts with ${conflicts.length} event(s)` : event.title}
                >
                  <p className={styles.eventName}>
                    {hasConflict && <span className={styles.conflictIcon}>⚠️</span>}
                    {event.title}
                  </p>
                </div>
              );
            })}
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

      {/* Event Modal for adding */}
      {showModal && <EventModal />}
    </div>
  );
};

export default CalendarGridContainer;
