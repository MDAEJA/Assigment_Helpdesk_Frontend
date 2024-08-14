// src/App.js
import React, { createContext, useState } from 'react';
import {  Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage';
import TicketsPage from './components/TicketsPage';
import CustomersPage from './components/CustomersPage';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import Sidebar from './components/Sidebar';
import TicketStatus from './components/TicketStatus';

export const userContext = createContext();

function App() {
  const[userInfo,setUserInfo] = useState({
    "id" : "",
    "name" : "",
    "email" : "",
    "role" : "",
    "status" : "Pending",
    "priority" : ""
  })

  const[customerData,setCustomerData] = useState([]);
  const[index,setIndex] = useState(0);
const[updateDetails,setUpdateDetails] = useState({});
  return (
    <userContext.Provider value={{userInfo,setUserInfo,customerData,setCustomerData,index,setIndex,updateDetails,setUpdateDetails}}>
    {/* <Router> */}
      <div className="app">
        <Sidebar/>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/tickets" element={<TicketsPage/>} />
            <Route path='/customers' element={<CustomersPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path='/ticketstatus' element={<TicketStatus/>}></Route>
          </Routes>
        </div>
      </div>
    {/* </Router> */}
    </userContext.Provider>
  );
}

export default App;
