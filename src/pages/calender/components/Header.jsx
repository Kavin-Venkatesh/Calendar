import React, { useEffect, useState } from "react";
import styles from '../views/styles.module.css';

import { FiEdit } from "react-icons/fi";
import { IoMdClock } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { PiGreaterThanBold, PiLessThanBold } from "react-icons/pi";

const Header = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Format date object to 'yyyy-mm-dd'
  const formatDate = (dateObj) => {
    const year = dateObj.year;
    const month = String(dateObj.month + 1).padStart(2, '0');
    const day = String(dateObj.day).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Today's date in 'yyyy-mm-dd'
  const today = new Date().toISOString().split("T")[0];

  // Load events from localStorage
  useEffect(() => {
  const storedEvents = JSON.parse(localStorage.getItem("calendar-events")) || [];
  console.log(storedEvents)
  setEvents(storedEvents);
}, []);


  // Filter events for today
  const todaysEvents = events.filter(event => {
    return event.date && formatDate(event.date) === today;
  });

  const hasEventToday = todaysEvents.length > 0;
  const currentEvent = hasEventToday ? todaysEvents[currentEventIndex] : null;

  // Navigation handlers
  const nextEvent = () => {
    if (currentEventIndex < todaysEvents.length - 1) {
      setCurrentEventIndex(prev => prev + 1);
    }
  };

  const prevEvent = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(prev => prev - 1);
    }
  };

  // Date to display in header
  const formattedDate = hasEventToday
    ? `${currentEvent.date.day} - ${new Date(currentEvent.date.year, currentEvent.date.month - 1).toLocaleString("default", { month: "long" }).toUpperCase()} - ${currentEvent.date.year}`
    : `${today.split("-")[2]} - ${new Date().toLocaleString("default", { month: "long" }).toUpperCase()} - ${today.split("-")[0]}`;

  return (
    <div className={styles.headerMainContainer}>
      {/* Top Row */}
      <div className={styles.headerTopContainer}>
        <div className={styles.headerTitleContainer}>
          <h1 className={styles.headerTitle}>
            {hasEventToday ? currentEvent.title : formattedDate}
          </h1>
        </div>
        <div className={styles.headerTitleContainer}>
          <button className={styles.editButton}>
            {hasEventToday ? "Edit Event" : "Add Event"}
            <FiEdit className={styles.editIcon} />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.headerBottomContainer}>
        {hasEventToday ? (
          <>
            <div className={styles.headerDetailsContainer}>
              <h4 id={styles.headerDetail}>Details :</h4>
              <div className={styles.detailContainer}>
                <IoMdClock className={styles.clockIcon} />
                <p className={styles.headerDetails}>
                  Time : {currentEvent.startTime} - {currentEvent.endTime}
                </p>
              </div>
              <div className={styles.detailContainer}>
                <LuTimer className={styles.timerIcon} />
                <p className={styles.headerDetails}>Duration : 1 Hour</p>
              </div>
            </div>

            <div className={styles.headerDetailsContainer}>
              <div className={styles.detailContainer}>
                <FaCalendarAlt className={styles.clockIcon} />
                <p className={styles.headerDetails}>Date : {formatDate(currentEvent.date)}</p>
              </div>
              <div className={styles.detailContainer}>
                <FaCalendarCheck className={styles.clockIcon} />
                <p className={styles.headerDetails}>
                  Event Mode : <span id={styles.EventMode}>{currentEvent.mode}</span>
                </p>
              </div>
              {currentEvent.mode === "offline" && currentEvent.location && (
                <div className={styles.detailContainer}>
                  <FaCalendarAlt className={styles.clockIcon} />
                  <p className={styles.headerDetails}>Location : {currentEvent.location}</p>
                </div>
              )}
            </div>

            {todaysEvents.length > 1 && (
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
                  disabled={currentEventIndex === todaysEvents.length - 1}
                >
                  <PiGreaterThanBold className={styles.greaterLesserIcon} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.headerDetailsContainer}>
            <p className={styles.noEventQuote}>
              "No events scheduled today. Plan your day and add something meaningful!"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
