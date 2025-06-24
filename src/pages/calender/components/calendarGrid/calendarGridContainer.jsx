import styles from './views/calendarGrid.module.css';


const CalendarGridContainer = () =>{
    return(
        <div className={styles.calendarGrid}>
            <div className={styles.dayHeader}> MON </div>
            <div className={styles.dayHeader}> TUE </div>
            <div className={styles.dayHeader}> WED </div>
            <div className={styles.dayHeader}> THU </div>
            <div className={styles.dayHeader}> FRI </div>
            <div className={styles.dayHeader}> SAT </div>
            <div className={styles.dayHeader}> SUN </div>
        </div>
    )
}

export default CalendarGridContainer;