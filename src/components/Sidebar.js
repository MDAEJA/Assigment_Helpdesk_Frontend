// src/components/Sidebar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTicketAlt, FaUser, FaUsers, FaCogs, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Sidebar.css';
import { userContext } from '../App';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {userInfo} = useContext(userContext);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="sidebar-header">
        <h2><FaCogs /> Helpdesk</h2>
        <div className="profile-info">
          <div className="profile-pic">
            <img src="https://cdn-icons-png.flaticon.com/128/4525/4525966.png" alt="Profile" />
          </div>
          <div className="profile-text">
            <p style={{textTransform:"capitalize"}}>Welcome, {(userInfo.name) ? userInfo.name : "User"}</p>
            <p>Role: {(userInfo.role) ? userInfo.role : "Admin"}</p>
          </div>
        </div>
      </div>
      <ul>
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/tickets"><FaTicketAlt /> Tickets</Link></li>
        <li><Link to="/customers"><FaUsers /> Customers</Link></li>
        <li><Link to="/profile"><FaUser /> Profile</Link></li>
        <li><Link to="/admin"><FaCogs /> Admin</Link></li>
      </ul>
      <div className="sidebar-footer">
        <p>© 2024 Helpdesk App</p>
      </div>
    </div>
  );
};

export default Sidebar;
