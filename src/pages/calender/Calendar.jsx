//components import
import NavBar from './components/NavBar';
import Header from './components/Header';
import CalendarGrid from './components/calendarGrid/calendarGrid';


import { CalendarProvider } from '../../context/CalendarContext';

//styles import 
import styles from './views/styles.module.css'

const CalendarPage = () => {
    return(
        <CalendarProvider>
            <div className={styles.mainContainer}>
                <NavBar />
                <Header />
                <CalendarGrid />
            </div>
        </CalendarProvider>
    )
}

export default CalendarPage;