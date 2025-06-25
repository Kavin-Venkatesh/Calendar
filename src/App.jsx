import React, { useState, useEffect } from 'react';
import {BrowserRouter , Routes , Route } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import CalendarPage from './pages/calender/Calendar';
import { CalendarProvider } from './context/CalendarContext';
import { LoadingPage } from './components/loading';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); 

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return(

         <BrowserRouter>
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/" element={<CalendarPage />} />
                </Routes>
            </BrowserRouter>
        // <CalendarProvider>
        //     <BrowserRouter>
        //         <ToastContainer position="top-right" autoClose={3000} />
        //         <Routes>
        //             <Route path="/" element={<CalendarPage />} />
        //         </Routes>
        //     </BrowserRouter>
        // </CalendarProvider>
    )
}

export default App;