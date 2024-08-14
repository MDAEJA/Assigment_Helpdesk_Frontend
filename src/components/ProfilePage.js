// src/components/ProfilePage.js
import React, { useContext } from 'react';
import '../styles/ProfilePage.css';
import { userContext } from '../App';

const ProfilePage = () => {
  const {userInfo,updateDetails,setUpdateDetails} = useContext(userContext);
  const user = {
    profilePicture: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
    joinedDate: '2023-05-12',
    location: 'New York, USA',
    website: 'https://jane.doe.com'
  };
  return (
    <>
     <div>
      <h1 style={{textAlign:"center", backgroundColor:"black",color:'whitesmoke',fontStyle:"italic"}}>Ticket Status !!!</h1>
    </div>

    <div className="profile-page">
     
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <div className="">
          <h1 style={{backgroundColor:"black",color:"whitesmoke",textAlign:"center",textTransform:"capitalize"}}>{(userInfo.name) ? userInfo.name : "User"}</h1>
          <p style={{backgroundColor:"black",color:"whitesmoke",textAlign:"center",padding:"5px 5px"}}>{(userInfo.email) ? userInfo.email : "User@gmail.com"}</p>
        </div>
      </div>
      <div className="profile-bio">
        <h2>About Me</h2>
        <p>{user.bio}</p>
      </div>
      <div className="profile-details">
        <h2>Details</h2>
        <ul>
          <li><strong>Priority:</strong>{(userInfo.priority) ? userInfo.priority : "Low"} </li>
          <li><strong>Status:</strong>{(userInfo.status) ? userInfo.status : "Not-Define"}</li>
          <li><strong>Website:</strong> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></li>
        </ul>
      </div>
    </div>
    </>
    
  );
};

export default ProfilePage;
