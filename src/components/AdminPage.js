// src/components/AdminPage.js
import React, { useContext, useEffect, useState } from 'react';
import '../styles/AdminPage.css'
import { userContext } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [showAccessDenied, setShowAccessDenied] = useState(true);
  const { userInfo, customerData, setCustomerData, index, setIndex,updateDetails,setUpdateDetails} = useContext(userContext);
  

  const changeStatusHandler = (indx) => {
    setIndex(indx);
    setUpdateDetails(customerData[indx])
    navigate('/ticketstatus');
  }

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
      setCustomerData(result.info);
    } catch (err) {
      console.error("Catch error:", err);
      toast.error("An error occurred: " + (err.response ? err.response.data : err.message));
    }
  };

  useEffect(() => {
    fetchData();
  }, [customerData]); // Empty dependency array to run only once

  return (
    <>
      {userInfo.role === "Admin" ? (
        <div className="admin-page">
          <div>
            <h1 style={{ textAlign: "center", backgroundColor: "black", color: 'whitesmoke', fontStyle: "italic" }}>Admin Page !!!</h1>
          </div>
          <header className="hero">
            <h1>Welcome to Helpdesk</h1>
            <p>Your support is just a click away!</p>
          </header>
          <section className="default-data">
            <h1 style={{ textAlign: "center", backgroundColor: "black", color: 'whitesmoke', fontStyle: "italic" }}>Recent Tickets !!!</h1>
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {customerData
                  .filter(item => item.role !== 'Admin') // Filter out admins
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                      <td>{item.email}</td>
                      <td style={{ textTransform: "capitalize" }}>{item.role}</td>
                      <td style={{ textTransform: "capitalize" }}>{item.Status}</td>
                      <td>{!item.updatedAt ? "Not Updated" : item.updatedAt}</td>
                      <td>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/159/159604.png" // Example direct image URL
                          alt="Eye Icon"
                          onClick={() => {
                            changeStatusHandler(index);
                          }}
                          style={{ width: "24px", height: "24px", cursor: "pointer" }} // Optional: size adjustment
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>
      ) : (
        <div>
          {showAccessDenied && (
            <div className="access-denied">
              <h2>Access Denied</h2>
              <p>Cannot access, not an admin.</p>
              <button onClick={() => {
                setShowAccessDenied(false);
                navigate('/');
              }}>Close</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminPage;
