//styles import 

import styles from './views/calendarGrid.module.css';


//components import
import CalendarGridHeader from './calendarGridHeader';
import CalendarGridContainer from './calendarGridContainer';

const CalendarGrid = () =>{
    return(
        <div className={styles.calendarGridContainer}>
            <CalendarGridHeader />
            <CalendarGridContainer />
        </div>
    )
}

export default CalendarGrid;