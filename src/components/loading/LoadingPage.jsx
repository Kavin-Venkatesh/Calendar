import React from 'react';
import styles from './LoadingPage.module.css';

const LoadingPage = () => {
  // Get current date for calendar icon
  const currentDate = new Date().getDate();

  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingContainer}>
        {/* Calendar Icon Loader */}
        <div className={styles.calendarLoader}>
          <div className={styles.calendarIcon}>
            <div className={styles.calendarHeader}></div>
            <div className={styles.calendarBody}>
              <div className={styles.calendarDate}>
                <span>{currentDate}</span>
              </div>
              <div className={styles.loadingDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className={styles.loadingTitle}>
            Loading Calendar
        </h2>

        {/* Animated Background Elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.floatingElement} style={{ '--delay': '0s' }}></div>
          <div className={styles.floatingElement} style={{ '--delay': '0.5s' }}></div>
          <div className={styles.floatingElement} style={{ '--delay': '1s' }}></div>
          <div className={styles.floatingElement} style={{ '--delay': '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
