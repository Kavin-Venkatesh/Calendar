import styles from './views/calendarGrid.module.css';
import { PiGreaterThanBold, PiLessThanBold } from "react-icons/pi";

const CalendarGridHeader = ({ month, year, onNext, onPrev, onYearChange , onMonthChange}) => {
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 50 }, (_, i) => 1990 + i); // 1990–2039

  return (
    <div className={styles.calendarGridHeader}>
      <div className={styles.calendarGridLeftContainer}>
        <h4 className={styles.GridMonthYearTitle}>
          {monthName}
           -  
          {year}
        </h4>
      </div>

      <div className={styles.calendarGridRightContainer}>
        
          <select className={styles.monthSelect} value={month} onChange={onMonthChange}>
          {monthNames.map((name, index) => (
            <option key={index} value={index}>{name}</option>
          ))}
        </select>

        <select className={styles.yearSelect} value={year} onChange={onYearChange}>
          {years.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>

        <button className={styles.nextButton} title="Previous Month" onClick={onPrev}>
          <PiLessThanBold className={styles.greaterLesserIcon} />
        </button>
        <button className={styles.nextButton} title="Next Month" onClick={onNext}>
          <PiGreaterThanBold className={styles.greaterLesserIcon} />
        </button>
      </div>
    </div>
  );
};

export default CalendarGridHeader;
