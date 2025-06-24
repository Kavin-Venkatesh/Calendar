//components import
import NavBar from './components/NavBar';
import Header from './components/Header';
import CalendarGrid from './components/calendarGrid/calendarGrid';


//styles import 
import styles from './views/styles.module.css'

const CalendarPage = () => {
    return(
        <div className={styles.mainContainer}>
            <NavBar />
            <Header />
            <CalendarGrid />
        </div>
    )
}

export default CalendarPage;