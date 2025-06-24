import React, { useState } from 'react';
import styles from './views/calendarGrid.module.css';

import CalendarGridHeader from './calendarGridHeader';
import CalendarGridContainer from './calendarGridContainer';

const CalendarGrid = () => {
  const today = new Date();
  const [date, setDate] = useState({
    month: today.getMonth(), // 0-11
    year: today.getFullYear()
  });

  const handleNextMonth = () => {
    setDate((prev) => {
      if (prev.month === 11) {
        return { month: 0, year: prev.year + 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  const handlePrevMonth = () => {
    setDate((prev) => {
      if (prev.month === 0) {
        return { month: 11, year: prev.year - 1 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  const handleMonthChange = (e) => {
    setDate({ ...date, month: Number(e.target.value) });
  };

  const handleYearChange = (e) => {
    setDate({ ...date, year: Number(e.target.value) });
  };

  return (
    <div className={styles.calendarGridContainer}>
      <CalendarGridHeader
        month={date.month}
        year={date.year}
        onNext={handleNextMonth}
        onPrev={handlePrevMonth}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />
      <CalendarGridContainer
        month={date.month}
        year={date.year}
      />
    </div>
  );
};

export default CalendarGrid;
