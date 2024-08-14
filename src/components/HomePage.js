// src/pages/Home.js
import React from 'react';
import { FaTicketAlt, FaTasks, FaClock } from 'react-icons/fa';
import '../styles/HomePage.css';

const sampleTickets = [
  { id: 'T001', title: 'Login Issue', status: 'Active', lastUpdated: '2024-08-10' },
  { id: 'T002', title: 'Payment Error', status: 'Pending', lastUpdated: '2024-08-09' },
  { id: 'T003', title: 'Feature Request', status: 'Closed', lastUpdated: '2024-08-08' },
  { id: 'T001', title: 'Login Issue', status: 'Active', lastUpdated: '2024-08-10' },
  { id: 'T002', title: 'Payment Error', status: 'Pending', lastUpdated: '2024-08-09' },
  { id: 'T003', title: 'Feature Request', status: 'Closed', lastUpdated: '2024-08-08' },
  { id: 'T001', title: 'Login Issue', status: 'Active', lastUpdated: '2024-08-10' },
  { id: 'T002', title: 'Payment Error', status: 'Pending', lastUpdated: '2024-08-09' },
  { id: 'T003', title: 'Feature Request', status: 'Closed', lastUpdated: '2024-08-08' },
];

const HomePage = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Helpdesk</h1>
        <p>Your support is just a click away!</p>
      </header>
      
      <section className="default-data">
      <div>
      <h1 style={{textAlign:"center", backgroundColor:"black",color:'whitesmoke',fontStyle:"italic"}}>Recent Ticket  !!!</h1>
    </div>
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {sampleTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="features">
        <div className="feature-card">
          <FaTicketAlt className="feature-icon" />
          <h2>Submit a Ticket</h2>
          <p>Easily submit and track your support requests.</p>
        </div>
        <div className="feature-card">
          <FaTasks className="feature-icon" />
          <h2>Track Your Requests</h2>
          <p>View and manage all your support tickets in one place.</p>
        </div>
        <div className="feature-card">
          <FaClock className="feature-icon" />
          <h2>Get Help Fast</h2>
          <p>Receive timely responses from our support team.</p>
        </div>
      </section>
      <footer className="footer">
        <p>© 2024 Helpdesk App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
