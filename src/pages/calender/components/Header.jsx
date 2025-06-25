import React, { useEffect, useState } from "react";
import styles from '../views/styles.module.css';

import { useCalendar } from '../../../context/CalendarContext';

import { FiEdit, FiPlus } from "react-icons/fi";
import { IoMdClock } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { PiGreaterThanBold, PiLessThanBold } from "react-icons/pi";
import { FaLocationPin } from "react-icons/fa6";

const Header = () => {
  const {
    selectedDate,
    selectedEvents,
    setSelectedDate,
    setSelectedEvents,
    events,
    openAddModal,
    openEditModal,
    selectDate,
  } = useCalendar();

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    setCurrentEventIndex(0);
  }, [selectedEvents]);

  // Ensure currentEventIndex is within bounds
  useEffect(() => {
    if (selectedEvents && selectedEvents.length > 0 && currentEventIndex >= selectedEvents.length) {
      setCurrentEventIndex(0);
    }
  }, [selectedEvents, currentEventIndex]);

  // Auto-select today's date and events on component mount
  useEffect(() => {
    // Get today's date
    const today = new Date();
    const todayObj = {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()
    };

    // Only auto-select if no date is currently selected
    if (!selectedDate) {
      selectDate(todayObj);
    }
  }, [selectedDate, selectDate]);

  // Get today's date
  const today = new Date();
  const todayObj = {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  };

  // Use today if no date is selected
  const date = selectedDate || todayObj;

  // Format date to readable string
  const formattedDate = `${date.day} - ${new Date(date.year, date.month).toLocaleString("default", { month: "long" }).toUpperCase()} - ${date.year}`;

  const hasEvent = selectedEvents && selectedEvents.length > 0;
  const currentEvent = hasEvent && selectedEvents[currentEventIndex] ? selectedEvents[currentEventIndex] : null;

  const formatDateStr = (d) =>
    `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;

  const duration = (start, end) => {
    if (!start || !end) return "";
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let hours = eh - sh;
    let mins = em - sm;
    if (mins < 0) {
      hours--;
      mins += 60;
    }
    return `${hours} Hour${hours > 1 ? "s" : ""} ${mins ? mins + " Min" : ""}`;
  };

  const handleAddEvent = () => {
    openAddModal(date);
  };

  const handleEditEvent = () => {
    if (currentEvent) {
      openEditModal(currentEvent);
    }
  };

  const nextEvent = () => {
    if (selectedEvents && selectedEvents.length > 0 && currentEventIndex < selectedEvents.length - 1) {
      setCurrentEventIndex((prev) => prev + 1);
    }
  };

  const prevEvent = () => {
    if (selectedEvents && selectedEvents.length > 0 && currentEventIndex > 0) {
      setCurrentEventIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.headerMainContainer}>
      {/* Top Header */}
      <div className={styles.headerTopContainer}>
        <div className={styles.headerTitleContainer}>
          <h1 className={styles.headerTitle}>
            {hasEvent && currentEvent && currentEvent.title ? currentEvent.title : formattedDate}
          </h1>
        </div>

          <div className={styles.buttonGroup}>
            <button 
              className={styles.editButton}
              onClick={handleAddEvent}
              title="Add New Event"
            >
              Add Event
              <FiPlus className={styles.editIcon} />
            </button>
            {hasEvent && currentEvent && (
              <button 
                className={styles.editButton}
                onClick={handleEditEvent}
                title="Edit Current Event"
              >
                Edit Event
                <FiEdit className={styles.editIcon} />
              </button>
            )}
          </div>
      </div>

      {/* Bottom Header */}
      <div className={styles.headerBottomContainer}>
        {hasEvent && currentEvent ? (
          <>
            <div className={styles.headerDetailsContainer}>
              <h4 id={styles.headerDetail}>Details:</h4>

              <div className={styles.detailContainer}>
                <IoMdClock className={styles.clockIcon} />
                <p className={styles.headerDetails}>
                  Time: {currentEvent.startTime || 'N/A'} - {currentEvent.endTime || 'N/A'}
                </p>
              </div>

              <div className={styles.detailContainer}>
                <LuTimer className={styles.timerIcon} />
                <p className={styles.headerDetails}>
                  Duration: {duration(currentEvent.startTime, currentEvent.endTime)}
                </p>
              </div>
            </div>

            <div className={styles.headerDetailsContainer}>
              <div className={styles.detailContainer}>
                <FaCalendarAlt className={styles.clockIcon} />
                <p className={styles.headerDetails}>
                  Date: {currentEvent.date ? formatDateStr(currentEvent.date) : 'N/A'}
                </p>
              </div>

              <div className={styles.detailContainer}>
                <FaCalendarCheck className={styles.clockIcon} />
                <p className={styles.headerDetails}>
                  Event Mode: <span id={styles.EventMode}>{currentEvent.mode || 'N/A'}</span>
                </p>
              </div>

              {currentEvent.mode === "offline" && currentEvent.location && (
                <div className={styles.detailContainer}>
                  <FaLocationPin className={styles.clockIcon} />
                  <p className={styles.headerDetails}>
                    Location: {currentEvent.location}
                  </p>
                </div>
              )}
            </div>

            {selectedEvents.length > 1 && (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.nextButton}
                  title="Previous Event"
                  onClick={prevEvent}
                  disabled={currentEventIndex === 0}
                >
                  <PiLessThanBold className={styles.greaterLesserIcon} />
                </button>
                <button
                  className={styles.nextButton}
                  title="Next Event"
                  onClick={nextEvent}
                  disabled={currentEventIndex === selectedEvents.length - 1}
                >
                  <PiGreaterThanBold className={styles.greaterLesserIcon} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.headerDetailsContainer}>
            <p className={styles.noEventQuote}>
              "No events scheduled. Use your time wisely and add something meaningful!"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
