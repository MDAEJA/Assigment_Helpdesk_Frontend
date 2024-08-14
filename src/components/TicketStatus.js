import React, { useContext, useEffect, useState } from 'react';
import '../styles/ticketStatus.css';
import { userContext } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function TicketStatus() {
    const navigate = useNavigate();
    const { customerData, setCustomerData, index,updateDetails,setUpdateDetails } = useContext(userContext);
    const [updateStatus, setUpdateStatus] = useState("");
    

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
            console.log(result.info);

            setCustomerData(result.info.reverse()); // Directly set the fetched data and reverse if needed
        } catch (err) {
            console.error("Catch error:", err);
            toast.error("An error occurred: " + (err.response ? err.response.data : err.message));
        }
    };

    const updateHandler = async () => {
        try {
            if (updateStatus === "") {
                return toast.error("Select Status !!!");
            }

           
            const customerId = updateDetails._id;

            const response = await fetch("https://helpdesk-lnvj.onrender.com/get/update", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customerId, updateStatus })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Update error:", errorData);
                return toast.error("Failed to update ticket.");
            }

            const result = await response.json();
            console.log("Updated Successfully:", result);

            // toast.success("Ticket Updated Successfully !!!");
            fetchData();

            const updatedValue = customerData[index];

            setUpdateDetails({...updateDetails,Status : updateStatus});

            toast.success("Ticket Updated Successfully !!!");


            // setTimeout(() => {
            //     navigate('/customers');
            // }, 2000);
        } catch (err) {
            console.error("Catch error:", err);
            toast.error("An error occurred: " + err.message);
        }
    };

    const user = {
        profilePicture: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
        joinedDate: '2023-05-12',
        location: 'New York, USA',
        website: 'https://jane.doe.com'
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1 style={{ textAlign: "center", backgroundColor: "black", color: 'whitesmoke', fontStyle: "italic" }}>Ticket Status !!!</h1>
            </div>

            <div className="profile-page">
                <div className="update-status">
                    <h2>Update Status</h2>
                    <select onChange={(e) => { setUpdateStatus(e.target.value) }}>
                        <option value="">Select</option>
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <button onClick={updateHandler} style={{ backgroundColor: "lightcoral", padding: "10px 10px", borderRadius: "10px", fontStyle: "oblique", cursor: "pointer" }}>Update</button>
                </div>
                <div className="profile-header">
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <div>
                        <h1 style={{ backgroundColor: "black", color: "whitesmoke", textAlign: "center", textTransform: "capitalize" }}>
                            {updateDetails.name}
                        </h1>
                        <p style={{ backgroundColor: "black", color: "whitesmoke", textAlign: "center", padding: "5px 5px" }}>
                            {updateDetails.email}
                        </p>
                    </div>
                </div>
                <div className="profile-bio">
                    <h2>About Me</h2>
                    <p>{user.bio}</p>
                </div>
                <div className="profile-details">
                    <h2>Details</h2>
                    <ul>
                        <li><strong>Priority:</strong> {updateDetails.priority}</li>
                        <li><strong>Status:</strong> {updateDetails.Status}</li>
                        <li><strong>Website:</strong> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default TicketStatus;
