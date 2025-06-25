import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        <p className={styles.loadingText}>{message}</p>
      </div>
    </div>
  );
};

export default Loading;
