// src/pages/Tickets.js
import React, { useContext, useState } from 'react';
import { FaPlusCircle, FaTicketAlt } from 'react-icons/fa';
import '../styles/TicketsPage.css';
import { userContext } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const sampleTickets = [
  { id: 'T001', title: 'Login Issue', status: 'Active', priority: 'High', lastUpdated: '2024-08-10' },
  { id: 'T002', title: 'Payment Error', status: 'Pending', priority: 'Medium', lastUpdated: '2024-08-09' },
  { id: 'T003', title: 'Feature Request', status: 'Closed', priority: 'Low', lastUpdated: '2024-08-08' },
];

const TicketsPage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(userContext);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const submitHandler = async (e) => {
    // e.preventDefault();
    // navigate('/customers')

    const { name, email, role, priority } = userInfo;

    if (!name || !email || !role || !priority) {
      toast.warning("All Fields are Required !!!");
      return;
    }

    if (!email.includes("@")) {
      toast.warning("Invalid Email !!");
      return;
    }

    const newUserInfo = { ...userInfo, id: "TT00" + Math.floor(Math.random() * 100) };

    try {
      const response = await fetch("https://helpdesk-lnvj.onrender.com/create/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fetch error:", errorData);
        toast.error(errorData);
        return;
      }

      const result = await response.json();
      console.log("Ticket Created Successfully:", result);

      toast.success("Ticket Created Successfully !!!");
      setUserInfo(newUserInfo);

      setShowForm(false);
      navigate('/customers')

    

    } catch (err) {
      console.error("Catch error:", err);
      toast.error("An error occurred while creating the ticket.");
    }
  };

  return (
    <div className="tickets-page">
      <header className="page-header">
        <h1><FaTicketAlt /> Manage Your Tickets</h1>
        <button className="create-ticket-btn" onClick={toggleForm}>
          <FaPlusCircle /> Create New Ticket
        </button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Track Your Tickets</h2>
          <p>View and manage all your support tickets efficiently.</p>
        </div>
        <div className="feature-card">
          <h2>Update Status</h2>
          <p>Change ticket status and monitor progress.</p>
        </div>
        <div className="feature-card">
          <h2>Prioritize Issues</h2>
          <p>Assign priority to tickets for better management.</p>
        </div>
      </section>

      <section className="tickets-list">
        <h1 style={{ textAlign: "center", backgroundColor: "black", color: 'whitesmoke', fontStyle: "italic" }}>Recent Tickets</h1>
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {sampleTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showForm && (
        <div className="ticket-form-overlay">
          <div className="ticket-form">
            <h2>Create New Ticket</h2>
            <form >
              <label>
                Name:
                <input type="text" name="name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} required />
              </label>
              <label>
                Role:
                <select name="role" onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })} required>
                  <option value="">Select</option>
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                  <option value="Others">Others</option>
                </select>
              </label>
              <label>
                Description:
                <textarea name="description" required />
              </label>
              <label>
                Priority:
                <select name="priority" onChange={(e) => setUserInfo({ ...userInfo, priority: e.target.value })} required>
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <button onClick={submitHandler}>Submit</button>
              <button type="button" onClick={toggleForm}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
