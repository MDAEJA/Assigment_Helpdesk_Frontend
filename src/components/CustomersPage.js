import React, { useContext, useEffect } from 'react';
import '../styles/CustomersPage.css';
import { toast } from 'react-toastify';
import { userContext } from '../App';

const CustomersPage = () => {
  const { customerData, setCustomerData } = useContext(userContext);

  // Static sample tickets data
  const sampleTickets = [
    { id: 'T001', title: 'Login Issue', status: 'Active', lastUpdated: '2024-08-10' },
    { id: 'T002', title: 'Payment Error', status: 'Pending', lastUpdated: '2024-08-09' },
    { id: 'T003', title: 'Feature Request', status: 'Closed', lastUpdated: '2024-08-08' },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("https://helpdesk-lnvj.onrender.com/get/data", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fetch error:", errorData);
        return toast.error(errorData.message || "An error occurred");
      }

      const result = await response.json();
      setCustomerData(result.info);  // Directly set the fetched data
    } catch (err) {
      console.error("Catch error:", err);
      toast.error("An error occurred: " + (err.response ? err.response.data : err.message));
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once after mounting

  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Helpdesk</h1>
        <p>Your support is just a click away!</p>
      </header>

      <section className="default-data">
        <h1 style={{ textAlign: "center", backgroundColor: "black", color: 'whitesmoke', fontStyle: "italic" }}>Ticket Status !!!</h1>
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

      <section className="default-data">
        <h1 style={{ textAlign: "center", backgroundColor: "black", color: 'whitesmoke', fontStyle: "italic" }}>Customer Status !!!</h1>
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                <td>{item.email}</td>
                <td style={{ textTransform: "capitalize" }}>{item.role}</td>
                <td style={{ textTransform: "capitalize" }}>{item.Status}</td>
                <td>{!item.updatedAt ? "Not Updated" : item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CustomersPage;
