import styles from './views/calendarGrid.module.css';

import { PiGreaterThanBold } from "react-icons/pi";
import { PiLessThanBold } from "react-icons/pi";

const CalendarGridHeader = () =>{
    return(
        <div className={styles.calendarGridHeader}>
            <div className={styles.calendarGridLeftContainer}>
                <h4 className={styles.GridMonthYearTitle}>  June -  2025</h4>
            </div>

            <div className={styles.calendarGridRightContainer}>
                <button className={styles.nextButton} title= "Previous Month"> 
                    <PiLessThanBold className={styles.greaterLesserIcon}/>
                </ button>
                <button className={styles.nextButton} title= "Next Month">  
                    <PiGreaterThanBold  className={styles.greaterLesserIcon}/>    
                </button>
            </div>
        </div>
    )
}

export default CalendarGridHeader;