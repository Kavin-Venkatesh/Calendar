import {BrowserRouter , Routes , Route } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import CalendarPage from './pages/calender/Calendar';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () =>{
    return(
        <BrowserRouter>
             <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element= {<CalendarPage /> }/>
            </Routes>
        </BrowserRouter>
        
    )
}

export default App;