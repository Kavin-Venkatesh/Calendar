
import styles from '../views/styles.module.css';

//assets import
import { FiEdit } from "react-icons/fi";
import { IoMdClock } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { PiGreaterThanBold } from "react-icons/pi";
import { PiLessThanBold } from "react-icons/pi";

const Header = () =>{
    return(
        <div className={styles.headerMainContainer}>
            <div className={styles.headerTopContainer}>

                <div className={styles.headerTitleContainer}>
                        <h1 className={styles.headerTitle}> 23 - JUNE - 2025 </h1>
                </div>

                <div className={styles.headerTitleContainer}>
                        <button className={styles.editButton}> 
                            Add Event 
                            <FiEdit  className={styles.editIcon}/>
                        </button>
                </div>


            </div>

            <div className={styles.headerBottomContainer}>
                <div className={styles.headerDetailsContainer}>
                        <h4 id={styles.headerDetail}> Details : </h4>
                        <div className={styles.detailContainer}>
                            <IoMdClock   className={styles.clockIcon}/>
                             <p className = { styles.headerDetails}> Time : 3.00 PM - 4.00 PM </p>
                        </div>

                         <div className={styles.detailContainer}>
                            <LuTimer className={styles.timerIcon}/>
                             <p className = { styles.headerDetails}> Duration : 1 Hour </p>
                        </div>
        
                </div>
                
                 <div className={styles.headerDetailsContainer}>
                        
                         <div className={styles.detailContainer}>
                            <FaCalendarAlt  className={styles.clockIcon} />
                             <p className = { styles.headerDetails}> 
                                Date : 23 / 06 / 2025 
                                </p>
                        </div>

                         <div className={styles.detailContainer}>
                            <FaCalendarCheck  className={styles.clockIcon} />
                             <p className = { styles.headerDetails}> 
                                Event Mode : <span id={styles.EventMode}> Online </span> 
                                </p>
                        </div>
                </div>  


                <div className={styles.buttonContainer}>
                        <button className={styles.nextButton} title= "Previous Event"> 
                            <PiLessThanBold className={styles.greaterLesserIcon}/>
                        </ button>
                        <button className={styles.nextButton} title= "Next Event">  
                            <PiGreaterThanBold  className={styles.greaterLesserIcon}/>    
                        </button>

                </div>
            </div>
        </div>
    )
}

export default Header;