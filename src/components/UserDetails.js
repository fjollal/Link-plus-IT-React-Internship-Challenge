import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import './UserDetails.css';

const UserDetails = () => {
  const { users } = useUsers();
  const { id } = useParams();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="user-details-container">
        <div className="error-message">
          <h2>User not found</h2>
          <p>The user you're looking for doesn't exist.</p>
          <Link to="/" className="back-btn">Back to Users</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <div className="user-details-header">
        <Link to="/" className="back-btn">← Back to Users</Link>
        <h1>User Details</h1>
      </div>
      
      <div className="user-details-card">
        <div className="user-basic-info">
          <h2>{user.name}</h2>
          <p className="username">@{user.username}</p>
        </div>

        <div className="user-details-section">
          <h3>Contact Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="detail-item">
              <strong>Phone:</strong>
              <span>{user.phone}</span>
            </div>
            <div className="detail-item">
              <strong>Website:</strong>
              <span>
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="user-details-section">
          <h3>Address</h3>
          <div className="address-info">
            <p>{user.address.street}</p>
            <p>{user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
            <p>{user.address.geo.lat}, {user.address.geo.lng}</p>
          </div>
        </div>

        <div className="user-details-section">
          <h3>Company</h3>
          <div className="company-info">
            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Catchphrase:</strong> {user.company.catchPhrase}</p>
            <p><strong>Business:</strong> {user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

