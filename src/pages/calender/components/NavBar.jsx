import styles from '../views/styles.module.css';
import Logo from '../../../assests/Logo.jpg';


const NavBar = () =>{
    return(
        <div className={styles.navBar}>
            <img src={Logo} alt="Logo" className={styles.navBarLogo} />
            <h2 className={ styles.heading}> Calender </h2>
        </div>
    )
}

export default NavBar;